"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {app} from "@/lib/axios";
import Image from "next/image";
import {FormModal} from "./FormModal";
import {useToast} from "./ui/use-toast";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {asDeleteData} from "@/reduxconfig/actions/userActions";
import UpadateModal from "./UpadateModal";

export type User = {
  _id: string;
  email: string;
  contact: number;
  dob: string;
  image: {
    fileId: string;
    url: string;
  };
  name: string;
};

export function DataTableDemo() {
  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({table}) => <div>No</div>,
      cell: ({row}) => <div>{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({row}) => {
        // console.log(row.original.image);
        return (
          <div className="flex items-center justify-start gap-2">
            <div className="w-10 h-10">
              <Image
                src={row.original.image.url}
                height={40}
                width={40}
                alt="Profile photo"
                className="object-cover h-full w-full rounded-full"
              />
            </div>
            <div className="capitalize">{row.getValue("name")}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "contact",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Contact
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({row}) => (
        <div className="lowercase">{row.getValue("contact")}</div>
      ),
    },
    {
      accessorKey: "dob",
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            DOB
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({row}) => <div className="lowercase">{row.getValue("dob")}</div>,
    },
    //   {
    //     accessorKey: "amount",
    //     header: () => <div className="text-right">Amount</div>,
    //     cell: ({row}) => {
    //       const amount = parseFloat(row.getValue("amount"));

    //       // Format the amount as a dollar amount
    //       const formatted = new Intl.NumberFormat("en-US", {
    //         style: "currency",
    //         currency: "USD",
    //       }).format(amount);

    //       return <div className="text-right font-medium">{formatted}</div>;
    //     },
    //   },
    {
      id: "actions",
      enableHiding: false,
      cell: ({row}) => {
        const User = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(User._id)}>
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/home/${User._id}`}>View User</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <UpadateModal setIsLoading={setIsLoading} user={User} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteUser(User._id)}>
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [data, setApiData] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const {toast} = useToast();
  const getData = async () => {
    try {
      const {data} = await app.get("/readAll");
      setApiData(data.data);
      //   console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, [isLoading]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const deleteUser = async (id: string) => {
    try {
      const res = await dispatch(asDeleteData(id, toast));
      res && setIsLoading(!isLoading);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <FormModal setIsLoading={setIsLoading} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
