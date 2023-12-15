import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import data from "../../../data/products.json";
import React from "react";

const SimpleTable = () => {
  const [sorting, setSorting] = React.useState([]);
  const [filtering, setFiltering] = React.useState("");
  const [products, setProducts] = React.useState([...data]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "Product ID",
    },
    {
      header: "Name",
      accessorKey: "name",
      footer: "Product Name",
    },
    {
      header: "Price",
      accessorKey: "price",
      footer: "Product Price",
    },
    {
      header: "Description",
      accessorKey: "description",
      footer: "Product Description",
    },
    {
      header: "Status",
      accessorKey: "status",
      footer: "Product Status",
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <input
        type="text"
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        value={filtering}
      />
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-slate-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  onClick={column.column.getToggleSortingHandler()}
                  className="px-6 py-3 text-start"
                >
                  <a class="group inline-flex items-center gap-x-2" href="#">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                      {flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                    </span>
                    {
                      {
                        asc: "👇",
                        desc: "👆",
                      }[column.column.getIsSorted() ?? null]
                    }
                  </a>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              {row.getVisibleCells().map((cell) => (
                <td scope="col"
                  key={cell.id}
                  className="h-px w-px whitespace-nowrap align-top"
                >
        
                    <a className="block p-6 ">
                    {cell.column.columnDef.header === "Status" ? (
                             
                            <span
                               
                                className={
                                  
                                cell.getValue() === "available"
                                    ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                    : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                }
                            >
                                {cell.getValue()}
                            </span>
                            ) : cell.column.columnDef.header === "Imagen" ? (
                            <div className="flex items-center gap-x-4">
                                <img
                                className="flex-shrink-0 h-[2.375rem] w-[2.375rem] rounded-lg"
                                src={cell.value}
                                alt="Image Description"
                                />
                                <div>
                                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {cell.row.original.name}
                                </span>
                                </div>
                            </div>
                            ) : (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {cell.getValue()}
                            </span>
                            )}

                    </a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
         
  

            <div>
              <div className="inline-flex gap-x-2">
                <button
                  type="button"
                  className={`${
                    currentPage === 1 ? 'hidden' : ''} py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                  onClick={() => {
                    table.previousPage()
                    setCurrentPage(currentPage - 1);
        
                  }}
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Anterior
                </button>

                <button
                  type="button"
                  className={`${currentPage === table.getPageCount() ? 'hidden' : ''}
                  py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                  onClick={() => {
                    table.nextPage();
                    setCurrentPage(currentPage + 1);
                  
                    

                  }}
                >
                  Siguiente
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

      {/* <button onClick={() => table.setPageIndex(0)}>Primera Pagina</button>

      <button onClick={() => table.previousPage()}>Anterior Pagina</button>
      <button onClick={() => table.nextPage()}>Siguiente Pagina</button>

      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
        Ultima Pagina
      </button> */}
    </div>

    
  );
};

export default SimpleTable;
