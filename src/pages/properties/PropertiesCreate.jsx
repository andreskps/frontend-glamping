import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import MultipleImageUpload from "../../components/MultipleImageUpload";

import { createProperty } from "../../services/propertyService";
import PropertyForm from "./propertyForm";

const PropertiesCreate = () => {
  const [property, setProperty] = useState({
    name: "",
    description: "",
    location: "",
    capacity: 0,
    prices: [{
      description: "",
      price: "",
    }],
  });

  const queryClient = useQueryClient();

  const addProperty = useMutation({
     mutationFn: createProperty,
        onSuccess: () => {
        queryClient.invalidateQueries("properties");
    },

  });

  const navigate = useNavigate();


  const handleImageUpload = (files) => {
    // Aquí puedes realizar acciones con las imágenes cargadas, como enviarlas al servidor, etc.
    console.log("Imágenes cargadas:", files);
  };

  // Función para manejar cambios en la lista de tarifas
  const handlePriceChange = (index, key, value) => {
    const newPrices = [...property.prices];
    newPrices[index][key] = value;
    setProperty({ ...property, prices: newPrices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...property,
      prices,
    };

    try {
    
      await addProperty.mutateAsync(data);

      toast.success("Propiedad creada correctamente");

      navigate("/admin/propiedades");

      setProperty({
        name: "",
        description: "",
        location: "",
        capacity: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Función para añadir una nueva tarifa
  const addPrice = () => {
    setProperty({
      ...property,
      prices: [...property.prices, { description: "", price: "" }],
    });
  };
  return (
    // <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    //   <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
    //     <div className="text-center mb-8">
    //       <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
    //         Crear una propiedad
    //       </h2>
    //       <p className="text-sm text-gray-600 dark:text-gray-400">
    //         Complete el formulario para crear una propiedad
    //       </p>
    //     </div>

    //     <form>
    //       {/* Section */}
    //       <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
    //         <label className="inline-block text-sm font-medium dark:text-white">
    //           Información de la propiedad
    //         </label>

    //         <div className="mt-2 space-y-3">
    //           <input
    //             type="text"
    //             className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //             placeholder="Nombre"
    //             value={property.name}
    //             onChange={(e) =>
    //               setProperty({ ...property, name: e.target.value })
    //             }
    //           />
    //           <textarea
    //             className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //             placeholder="Descripción"
    //             value={property.description}
    //             onChange={(e) =>
    //               setProperty({ ...property, description: e.target.value })
    //             }
    //           />
    //           <input
    //             type="text"
    //             className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //             placeholder="Dirección"
    //             value={property.location}
    //             onChange={(e) =>
    //               setProperty({ ...property, location: e.target.value })
    //             }
    //           />

    //           <input
    //             type="number"
    //             value={property.capacity}
    //             onChange={(e) =>
    //               setProperty({ ...property, capacity: e.target.value })
    //             }
    //             placeholder="Capacidad"
    //             className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //           />
    //         </div>
    //       </div>

    //       <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
    //         <label className="inline-block text-sm font-medium dark:text-white">
    //           Tarifas
    //         </label>

    //         <div className="mt-2 space-y-3">
    //           {/* Mapea sobre la lista de tarifas */}
    //           {property.prices.map((price, index) => (
    //             <div key={index} className="flex space-x-3">
    //               <input
    //                 type="text"
    //                 value={price.description}
    //                 onChange={(e) =>
    //                   handlePriceChange(index, "description", e.target.value)
    //                 }
    //                 placeholder="Descripción"
    //                 className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //               />
    //               <input
    //                 type="text"
    //                 value={price.price}
    //                 onChange={(e) =>
    //                   handlePriceChange(index, "price", e.target.value)
    //                 }
    //                 placeholder="Precio"
    //                 className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //               />
    //             </div>
    //           ))}
    //           {/* Botón para añadir tarifa */}
    //           <button
    //             type="button"
    //             onClick={addPrice}
    //             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    //           >
    //             Añadir Tarifa
    //           </button>
    //         </div>
    //       </div>


    //       <div className="mt-5 flex justify-end gap-x-2">
    //         <button
    //           type="button"
    //           className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           type="button"
    //           className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    //           onClick={handleSubmit}
    //         >
    //           Save changes
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <PropertyForm isEditing={false}/>
  );
};

export default PropertiesCreate;
