/* eslint-disable @typescript-eslint/no-var-requires */
const { MongoClient } = require('mongodb');
const { config } = require('dotenv')
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

config({ path: ['.env.local', '.env', '.env.production'] });

const CSV_FILE_PATH = path.resolve(path.join(__dirname, '../data/earthquakes1970-2014.csv'));
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_NAME;

interface Earthquake {
  location: string;
  magnitude: number;
  date: Date;
}

interface CsvRow {
  Latitude: string;
  Longitude: string;
  Magnitude: string;
  DateTime: string;
}

async function insertEarthquakeData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(MONGODB_NAME);
    const collection = db.collection('earthquakes');
    const earthquakes = await parseCsvFile(CSV_FILE_PATH);

    if (earthquakes.length > 0) {
      const result = await collection.insertMany(earthquakes);
      console.log(`Inserted ${result.insertedCount} earthquake records into MongoDB`);
    } else {
      console.log('No data found to insert');
    }
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await client.close();
  }
}

function parseCsvFile(filePath: string): Promise<Earthquake[]> {
  return new Promise((resolve, reject) => {
    const earthquakes: Earthquake[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row: CsvRow) => {
        const earthquake: Earthquake = {
          location: `${row.Latitude}, ${row.Longitude}`,
          magnitude: parseFloat(row.Magnitude),
          date: new Date(row.DateTime),
        };
        earthquakes.push(earthquake);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(earthquakes);
      })
      .on('error', (error: never) => {
        reject(error);
      });
  });
}

insertEarthquakeData();
