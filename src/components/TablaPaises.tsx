import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import ReactCountryFlag from "react-country-flag";
import { CompanyInfo, CountryName } from "@/types/types";
import { countryMapping } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button } from "@/components/ui/button";

const columns = [
  {
    accessorKey: "NombreComercial",
    header: "Nombre Comercial",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "NombreLegal",
    header: "Nombre Legal",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "CEO",
    header: "CEO",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "FechaCreacion",
    header: "Fecha de Creación",
    enableSorting: true,
    enableColumnFilter: true,
    cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: "IngresoAnual",
    header: "Ingreso Anual",
    enableSorting: true,
    enableColumnFilter: false,
    cell: (info: any) => formatCurrency(info.getValue()),
  },
  {
    accessorKey: "CantidadEmpleados",
    header: "Cantidad de Empleados",
    enableSorting: true,
    enableColumnFilter: false,
    cell: (info: any) => formatNumber(info.getValue()),
  },
  {
    accessorKey: "Pais",
    header: "País",
    enableSorting: true,
    enableColumnFilter: true,
    cell: (info: any) => {
      const countryCode = countryMapping[info.getValue() as CountryName];
      return <ReactCountryFlag countryCode={countryCode} svg />;
    },
  },
  {
    accessorKey: "PrincipalProducto",
    header: "Producto Principal",
    enableSorting: true,
    enableColumnFilter: true,
  },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

const TablaPaises = () => {
  const companies = useSelector(
    (state: RootState) => state.companies.data as CompanyInfo[]
  );
  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-5 md:p-10">
      <Table>
        <TableCaption>
          Lista con información de compañías tecnológicas.
        </TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.column.columnDef.header as string}
                  {header.column.getCanSort() && (
                    <span onClick={header.column.getToggleSortingHandler()}>
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "asc"
                          ? " 🔼"
                          : " 🔽"
                        : " ⇅"}
                    </span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginacion */}
      <div>
        <span>
          Pagina {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <div>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablaPaises;
