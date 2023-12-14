import React from "react";
import { Link } from "react-router-dom";

const TableBody = ({ data, colums }) => {
  const handleDelete = (id) => {
    const cinfirm = alert(`Eliminar propiedad con id ${id}`);
  };
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
            <Link to={`/admin/propiedades/editar/${item.id}`}>
              <button
                type="button"
                className="inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <span>Edit</span>
              </button>
            </Link>

          
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
