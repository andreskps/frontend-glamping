// PropertyForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { usePoliticsStore } from "../../store/politicsStore";
import MultipleImageUpload from "../MultipleImageUpload";
import {
  getProperty,
  createProperty,
  updateProperty,
} from "../../services/propertyService";
import Input from "../ui/forms/Input";
import Button from "../ui/forms/Button";

const PropertyForm = ({ isEditing }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { politics } = usePoliticsStore((state) => state.politics);

  const {
    isLoading,
    error,
    data: property,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => (isEditing ? getProperty(id) : null),
    enabled: isEditing,
  });

  const mutation = useMutation({
    mutationFn: isEditing ? updateProperty : createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries("properties");
      toast.success(
        `Propiedad ${isEditing ? "actualizada" : "creada"} correctamente`
      );
      navigate("/admin/propiedades");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    location: "",
    capacity: 0,
    politicId: "",
    prices: [{ description: "", price: "" }],
  });

  // Estado de los cambios en el formulario
  const [formChanges, setFormChanges] = useState({
    id: isEditing ? id : null,
  });

  // Manejador de cambios en el formulario
  // const handleInputChange = (key, value) => {
  //   setFormChanges({ ...formChanges, [key]: value });
  // };
  useEffect(() => {
    if (isEditing && property) {
      setFormState({
        ...property,
        politicId: property?.politic?.id,
      });
    }
  }, [isEditing, property]);

  const handleImageUpload = (files) => {
    console.log("Imágenes cargadas:", files);
  };

  const handleInputChange = (key, value) => {
    setFormChanges({ ...formChanges, [key]: value });
    setFormState({ ...formState, [key]: value });
  };

  const handlePriceChange = (index, key, value) => {
    const newPrices = [...formState.prices];
    newPrices[index][key] = value;
    setFormChanges({ ...formChanges, prices: newPrices });
    setFormState({ ...formState, prices: newPrices });
  };

  const addPrice = () => {

    // setFormChanges({
    //   ...formChanges,
    //   prices: [...formChanges?.prices, { description: "", price: "" }],
    // })


    setFormState({
      ...formState,
      prices: [...formState.prices, { description: "", price: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate(formChanges);
  };

  if (isLoading) return <p>Cargando...</p>;

  if (error) return <p>Hubo un error al cargar la propiedad</p>;

  return (
    <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
            {isEditing ? "Editar" : "Crear"} propiedad
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2 space-y-3">
            <Input
              type="text"
              placeholder="Nombre"
              name="name"
              id="name"
              value={formState.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {/* <textarea
              className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Descripción"
              value={formState.description}
              name="description"
              id="description"
            /> */}

            <Input
              type="text"
              placeholder="Dirección"
              name="location"
              id="location"
              value={formState.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />

            <Input
              type="number"
              placeholder="Capacidad"
              name="capacity"
              id="capacity"
              value={formState.capacity}
              onChange={(e) => handleInputChange("capacity", e.target.value)}
            />

            <select
              name="politicId"
              id="politicId"
              value={formState.politicId}
              onChange={(e) => handleInputChange("politicId", e.target.value)}
            >
              <option value="">Selecciona una política</option>
              {politics?.map((politic) => (
                <option
                  key={politic.id}
                  selected={politic.id === formState.politicId}
                  value={politic.id}
                >
                  {politic.name}
                </option>
              ))}
            </select>
          </div>

          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <label className="inline-block text-sm font-medium dark:text-white">
              Tarifas
            </label>
            <div className="mt-2 space-y-3">
              {formState.prices.map((price, index) => (
                <div key={index} className="flex space-x-3">
                  <Input
                    type="text"
                    placeholder="Descripción"
                    value={price.description}
                    name="description"
                    onChange={(e) =>
                      handlePriceChange(index, "description", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Precio"
                    name="price"
                    value={price.price}
                    onChange={(e) =>
                      handlePriceChange(index, "price", e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={addPrice}
              >
                Agregar tarifa
              </button>
            </div>
          </div>

          {/* <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                <label className="inline-block text-sm font-medium dark:text-white">
                    Imágenes
                </label>
                <div className="mt-2 space-y-3">
                    <MultipleImageUpload onUpload={handleImageUpload} />
                </div>
            </div> */}

          <div className="mt-8 flex justify-end gap-x-2">
            <Button
              type="button"
              className="border-gray-300 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => navigate("/admin/propiedades")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              {isEditing ? "Actualizar" : "Crear"}
            </Button>
          </div>

          {/* <MultipleImageUpload onUpload={handleImageUpload} /> */}
          {/* ... (rest of your form components) */}
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
