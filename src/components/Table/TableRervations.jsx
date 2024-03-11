import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

const TableReservation = ({ columns, data }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const table = useReactTable({
    data: data,
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



  let classNameState =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  return (
    <>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
              <div className="sm:col-span-1">
                <label
                  htmlfor="hs-as-table-product-review-search"
                  className="sr-only"
                >
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="hs-as-table-product-review-search"
                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                    value={filtering}
                    name="hs-as-table-product-review-search"
                    className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Search"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                    <CiSearch className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* <div className="sm:col-span-2 md:grow">
                <div className="flex justify-end gap-x-2">
                  <div className="hs-dropdown relative inline-block [--placement:bottom-right]">
                    <Link
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      to="crear"
                    >
                      <IoIosAdd className="flex-shrink-0 w-6 h-6" />
                      Crear
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
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
                        <a
                          className="group inline-flex items-center gap-x-2"
                          href="#"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
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
                    <th scope="col" className="px-6 py-3 text-end"></th>
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
                      <td
                        scope="col"
                        key={cell.id}
                        className="h-px w-px whitespace-nowrap align-top"
                      >
                        <a className="block p-6 ">
                          {cell.column.columnDef.header === "Estado" ? (
                            <span
                              className={
                                cell.getValue() === "FINISHED"
                                  ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  : cell.getValue() === "CONFIRMED"
                                  ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                  : cell.getValue() === "CANCELLED"
                                  ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                  : ""
                              }
                            >
                              {cell.getValue()}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {cell.getValue()}
                            </span>
                          )}
                        </a>
                      </td>
                    ))}

                    <td className="h-px w-px whitespace-nowrap">
                      
                    <Link className="block"
                    to={`/admin/reserva/detalles/${row.original.id}`}
                    >
                    <span className="px-3 py-1.5">
                      <span className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                        <CiViewList className="flex-shrink-0 w-4 h-4" />
                        Ver
                      </span>
                    </span>
                  </Link>
                      </td>
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
                      currentPage === 1 ? "hidden" : ""
                    } py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                    onClick={() => {
                      table.previousPage();
                      setCurrentPage(currentPage - 1);
                    }}
                  >
                    <MdNavigateBefore className="flex-shrink-0 w-4 h-4" />
                    Anterior
                  </button>

                  <button
                    type="button"
                    className={`${
                      currentPage === table.getPageCount() ? "hidden" : ""
                    }
                    py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                    onClick={() => {
                      table.nextPage();
                      setCurrentPage(currentPage + 1);
                    }}
                  >
                    Siguiente
                    <MdNavigateNext className="flex-shrink-0 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default TableReservation;
