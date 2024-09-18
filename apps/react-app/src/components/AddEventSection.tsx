import ManageEarthquakeDialog from '@/components/Dialogs/ManageEarthquakeDialog';
import { useCreateEarthquakeMutation } from '@/graphql/earthquake';
import { Earthquake } from '@/types/earthquake';

export default function AddEventSection() {
  const [createEarthquake, { loading }] = useCreateEarthquakeMutation()

  const handleCreate = async (values: Earthquake) => {
    try {
      await createEarthquake({
        variables: values,
        refetchQueries: ['getEarthquakes'],
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="flex justify-between items-center w-full">
      <h5 className="py-1">Register the new Earthquake event</h5>
      <ManageEarthquakeDialog onSubmit={handleCreate}>
        {({ onClick }) => (
          <button className="btn btn-primary btn-sm" onClick={onClick}>Add New Event</button>
        )}
      </ManageEarthquakeDialog>
    </section>
  )
}
