"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AdminPostRow = {
  _id: string;
  title: string;
  type: "EDITORIAL" | "NEWS";
  language: "EN" | "OR";
  status: "DRAFT" | "PUBLISHED";
  createdAt?: string;
};

interface PostsClientProps {
  initialPosts: AdminPostRow[];
  deleteAction: (formData: FormData) => Promise<void>;
}

export function PostsClient({ initialPosts, deleteAction }: PostsClientProps) {
  const [filterType, setFilterType] = useState<"ALL" | "EDITORIAL" | "NEWS">("ALL");

  const columns: ColumnDef<AdminPostRow>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div className="font-semibold text-black">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <span className="bg-zinc-100 text-zinc-600 text-xs uppercase tracking-wider font-semibold px-2 py-1 rounded-sm">
          {row.getValue("type")}
        </span>
      ),
    },
    {
      accessorKey: "language",
      header: "Language",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const val = row.getValue("createdAt") as string;
        return val ? new Date(val).toLocaleDateString() : "-";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={`text-xs uppercase tracking-wider font-bold ${row.getValue("status") === 'PUBLISHED' ? 'text-[#124e27]' : 'text-amber-600'}`}>
          {row.getValue("status")}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div className="flex items-center gap-3">
            <Link href={`/admin/posts/${post._id}/edit`} className="text-sm font-semibold text-zinc-500 hover:text-black transition-colors">
              Edit
            </Link>
            <form action={deleteAction} className="inline">
              <input type="hidden" name="id" value={post._id} />
              <button type="submit" className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors">
                Delete
              </button>
            </form>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: initialPosts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filterType === "ALL" ? "" : filterType,
    },
    onGlobalFilterChange: setFilterType,
    globalFilterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === "ALL") return true;
      return row.getValue("type") === filterValue;
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => table.setGlobalFilter("ALL")}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors ${
              (table.getState().globalFilter || "ALL") === "ALL" 
                ? "bg-black text-white" 
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => table.setGlobalFilter("EDITORIAL")}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors ${
              table.getState().globalFilter === "EDITORIAL" 
                ? "bg-black text-white" 
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            Editorial
          </button>
          <button
            onClick={() => table.setGlobalFilter("NEWS")}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors ${
              table.getState().globalFilter === "NEWS" 
                ? "bg-black text-white" 
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            In the News
          </button>
        </div>
        <Link 
          href="/admin/posts/new" 
          className="bg-[#124e27] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
        >
          + New Post
        </Link>
      </div>

      <div className="rounded-sm border border-zinc-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-xs uppercase tracking-wider text-zinc-500 font-semibold h-10">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-zinc-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
