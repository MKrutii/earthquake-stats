import { MongoClient, Db, ObjectId, OptionalId } from 'mongodb'

export interface Earthquake {
  id: string;
  location: string;
  magnitude: number;
  date: Date;
}

export class EarthquakeDataSource {
  private client: MongoClient
  private db: Db | null = null

  constructor(private uri: string, private dbName: string) {
    this.client = new MongoClient(this.uri)
  }

  async initialize() {
    if (!this.db) {
      try {
        await this.client.connect()
        this.db = this.client.db(this.dbName)
        console.log(`Successfully connected to database: ${this.dbName}`)
      } catch (e) {
        console.error(`Unable to connect to database: ${e || e.message}`)
      }
    }
  }

  private getCollection() {
    if (!this.db) {
      throw new Error('MongoDB not initialized')
    }
    return this.db.collection<Earthquake>('earthquakes')
  }

  async getAllEarthquakes(): Promise<Earthquake[]> {
    const result = await this.getCollection().find().toArray()
    return result.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }))
  }

  async createEarthquake(earthquake: OptionalId<Earthquake>): Promise<Earthquake> {
    const result = await this.getCollection().insertOne(earthquake)
    return { ...earthquake, id: result.insertedId.toString() }
  }

  async updateEarthquake(id: string, earthquake: OptionalId<Earthquake>): Promise<Earthquake | null> {
    const result = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: earthquake },
      { returnDocument: 'after' }
    )
    return result ? { ...result, id: result._id.toString() } : null
  }

  async deleteEarthquake(id: string): Promise<boolean> {
    const result = await this.getCollection().deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }
}
