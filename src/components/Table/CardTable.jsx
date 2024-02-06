import React from "react";

const CardTable = ({ data,handleEdit,handleDelete }) => {
    console.log(data);


  return (

    

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div 
        key={item.id}
        className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
              
              
              <img src={item.images[0]?.url} alt={item.name} className="
                object-cover h-full w-full 
              " />
            
          </div>
          <div className="p-4 md:p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
              {item.name}
            </h3>
            
            <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Ubicación:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.location.displayName}</span>
            </div>

            <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado:</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.state}</span>
            </div>
            

           
          </div>
          <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <button
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={() => handleEdit(item.id)}
            >
              Editar
            </button>
            <button onClick={() => handleDelete(item.id)}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardTable;
