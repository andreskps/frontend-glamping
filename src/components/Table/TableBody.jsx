import React from "react";

const TableBody = ({ data, colums }) => {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {data.map((item, index) => (
        <tr
          key={index}
          className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          {colums.map((column, index) => (
            <td key={index} className="h-px w-px whitespace-nowrap align-top">
              <a className="block p-6" href="#">
                {column.label === "Estado" ? (
                  <span
                    className={
                      item[column.key] === "available"
                        ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    }
                  >
                    {item[column.key]}
                  </span>
                ) : column.label === "Imagen" ? (
                  <div className="flex items-center gap-x-4">
                    <img
                      className="flex-shrink-0 h-[2.375rem] w-[2.375rem] rounded-lg"
                      src={item[column.key]}
                      alt="Image Description"
                    />
                    <div>
                      <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item[column.key]}
                  </span>
                )}
              </a>
            </td>
          ))}
          <td className="h-px w-px whitespace-nowrap">
            <div className="px-6 py-1.5">
              <div className="hs-dropdown relative inline-block [--placement:bottom-right]">
                <button
                  id="hs-table-dropdown-6"
                  type="button"
                  className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700"
                  aria-labelledby="hs-table-dropdown-6"
                >
                  <div className="py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      Rename
                    </a>
                    <a
                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      Regenrate Key
                    </a>
                    <a
                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      Disable
                    </a>
                  </div>
                  <div className="py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700"
                      href="#"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
