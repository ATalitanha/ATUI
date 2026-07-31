import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { cn } from "@aurora-ui/utils";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@aurora-ui/icons";
import { Button } from "../primitives/Button/Button";

export interface DataGridProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageSize?: number;
  className?: string;
}

export function DataGrid<TData>({
  columns,
  data,
  pageSize = 10,
  className,
}: DataGridProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {/* Table search & selection controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--aurora-fg-subtle)]">
            <SearchIcon size={16} />
          </span>
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all rows..."
            className="w-full h-10 pl-9 pr-3 rounded-[var(--aurora-radius-md)] border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface)] text-sm text-[var(--aurora-fg-base)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--aurora-primary)]"
          />
        </div>
        <div className="text-xs text-[var(--aurora-fg-muted)]">
          {Object.keys(rowSelection).length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>

      {/* Grid Table Container */}
      <div className="overflow-x-auto border border-[var(--aurora-border-base)] rounded-[var(--aurora-radius-xl)] bg-[var(--aurora-bg-surface)]">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface-hover)]">
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="p-4 text-xs font-bold uppercase tracking-wider text-[var(--aurora-fg-muted)] select-none cursor-pointer hover:text-[var(--aurora-fg-base)] transition-colors"
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sorted === "asc" && <ChevronUpIcon size={12} />}
                        {sorted === "desc" && <ChevronDownIcon size={12} />}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[var(--aurora-border-subtle)] last:border-b-0 hover:bg-[var(--aurora-bg-surface-hover)] transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 text-sm text-[var(--aurora-fg-base)]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center p-8 text-sm text-[var(--aurora-fg-subtle)]">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            leadingIcon={<ArrowLeftIcon size={14} />}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            trailingIcon={<ArrowRightIcon size={14} />}
          >
            Next
          </Button>
        </div>
        <span className="text-xs text-[var(--aurora-fg-muted)]">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}
export { createColumnHelper };