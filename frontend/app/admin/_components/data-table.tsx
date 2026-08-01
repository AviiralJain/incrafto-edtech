import * as React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AdminCard } from './stats-card'

import { cn } from '@/lib/utils'

export type DataTableColumn = {
  key: string
  header: string
  className?: string
}

export type DataTableRow = {
  id?: string | number
  [key: string]: React.ReactNode
}

type DataTableProps = {
  title: string
  description?: string
  columns: DataTableColumn[]
  rows: DataTableRow[]
  emptyState?: string
  actions?: React.ReactNode
  loading?: boolean
  error?: string | null
  onRetry?: () => void
  pagination?: {
    page: number
    totalPages: number
    total: number
    onPageChange: (page: number) => void
  }
}

export function DataTable({
  title,
  description,
  columns,
  rows,
  emptyState = 'No records available.',
  actions,
  loading = false,
  error = null,
  onRetry,
  pagination,
}: DataTableProps) {
  const canGoPrev = pagination ? pagination.page > 1 : false
  const canGoNext = pagination ? pagination.page < pagination.totalPages : false

  return (
    <AdminCard className="p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div>{actions}</div> : null}
      </div>

      <div>
        {loading ? (
          <div className="flex items-center gap-3 px-6 py-10 text-sm text-slate-500 dark:text-slate-400">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500" />
            Loading records...
          </div>
        ) : error ? (
          <div className="flex flex-col gap-3 px-6 py-10 text-sm text-rose-600 dark:text-rose-400">
            <p>{error}</p>
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="w-fit rounded-full border border-rose-200 dark:border-rose-800 px-4 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 transition hover:bg-rose-50 dark:hover:bg-rose-900/30"
              >
                Retry
              </button>
            ) : null}
          </div>
        ) : rows.length === 0 ? (
          <div className="px-6 py-10 text-sm text-slate-500 dark:text-slate-400">{emptyState}</div>
        ) : (
          <div className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200/80 dark:border-slate-800 hover:bg-transparent">
                  {columns.map((column) => (
                    <TableHead
                      key={column.key}
                      className={cn(
                        'h-12 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400',
                        column.className,
                      )}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id ?? index} className="border-slate-200/80 dark:border-slate-800">
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn('px-6 py-4 text-sm text-gray-700 dark:text-slate-300', column.className)}
                      >
                        {row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {pagination ? (
              <div className="flex flex-col gap-3 border-t border-slate-200/80 dark:border-slate-800 pt-4 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Page {pagination.page} of {pagination.totalPages || 1} · {pagination.total} total
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => pagination.onPageChange(pagination.page - 1)}
                    disabled={!canGoPrev}
                    className="rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => pagination.onPageChange(pagination.page + 1)}
                    disabled={!canGoNext}
                    className="rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </AdminCard>
  )
}
