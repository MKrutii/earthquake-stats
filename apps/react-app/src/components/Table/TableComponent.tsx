import React, { useMemo } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useEarthquakeData } from '@/components/Providers/EarthquakeDataProvider'
import { Earthquake } from '@/types/earthquake'
import ActionsCell from '@/components/Table/ActionsCell'

export default function TableComponent() {
  const { earthquakes, isLoading } = useEarthquakeData()
  const columns = useMemo<ColumnDef<Earthquake>[]>(
    () => [
      {
        accessorKey: 'location',
        header: 'Location (Latitude, Longitude)',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'magnitude',
        header: 'Magnitude',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => {
          const dateValue = info.getValue() as string
          const date: Date = new Date(dateValue)

          return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
          }).format(date)
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'id',
        header: 'Actions',
        cell: (info) => <ActionsCell cellInfo={info} />,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
    ],
    []
  )

  const table = useReactTable({
    data: earthquakes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact table-zebra w-full text-center">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none m-2'
                          : 'm-2',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{ asc: ' 🔼', desc: ' 🔽' }[
                        header.column.getIsSorted() as string
                      ] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center justify-between gap-2">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {' << '}
          </button>
          <button
            className="join-item btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {' < '}
          </button>
          <button
            className="join-item btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {' > '}
          </button>
          <button
            className="join-item btn"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {' >> '}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          <span>Go to page:</span>
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="input input-bordered w-20"
          />
        </span>
        <span>{table.getPrePaginationRowModel().rows.length} Rows</span>
      </div>
    </div>
  )
}
