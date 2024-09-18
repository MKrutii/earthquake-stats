import { Earthquake } from '@/types/earthquake'
import { CellContext } from '@tanstack/react-table'
import { useDeleteEarthquakeMutation, useUpdateEarthquakeMutation } from '@/graphql/earthquake'
import ManageEarthquakeDialog from '@/components/Dialogs/ManageEarthquakeDialog'

interface ActionCell {
  cellInfo: CellContext<Earthquake, unknown>
}

export default function ActionsCell({ cellInfo }: ActionCell) {
  const id = cellInfo.getValue() as string

  const [deleteEarthquake, { loading: isDeleteLoading }] = useDeleteEarthquakeMutation()
  const [updateEarthquake] = useUpdateEarthquakeMutation()

  const handleDelete = async () => {
    try {
      await deleteEarthquake({
        variables: { id },
        update(cache) {
          cache.evict({ id: `Earthquake:${id}` })
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (values: Earthquake) => {
    try {
      await updateEarthquake({
        variables: values,
        update(cache, { data: { updateEarthquake } }) {
          cache.modify({
            id: `Earthquake:${id}`,
            fields: {
              location: () => updateEarthquake.location,
              magnitude: () =>updateEarthquake.magnitude,
              date: () => updateEarthquake.date,
            },
          })
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="join">
      <ManageEarthquakeDialog onSubmit={handleEdit} defaultValues={cellInfo.row.original}>
        {({ onClick }) => (
          <button className="join-item btn btn-xs btn-square btn-info" onClick={onClick}>
            <svg
              className="inline-block h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>
            </svg>
          </button>
        )}
      </ManageEarthquakeDialog>

      <button
        className="join-item btn btn-xs btn-square btn-error"
        onClick={handleDelete}
        disabled={isDeleteLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
