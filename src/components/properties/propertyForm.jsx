// PropertyForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { usePoliticsStore } from "../../store/politicsStore";
import MultipleImageUpload from "../MultipleImageUpload";
import {
  getProperty,
  createProperty,
  updateProperty,
  uploadImage,
  deleteImage
} from "../../services/propertyService";
import Input from "../ui/forms/Input";
import Button from "../ui/forms/Button";

const PropertyForm = ({ isEditing }) => {
  const { id } = useParams();
  const [propertyImages, setPropertyImages] = useState([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { politics } = usePoliticsStore((state) => state.politics);
  const days = [
    {
      value: "MONDAY",
      label: "Lunes",
    },
    {
      value: "TUESDAY",
      label: "Martes",
    },
    {
      value: "WEDNESDAY",
      label: "Miércoles",
    },
    {
      value: "THURSDAY",
      label: "Jueves",
    },
    {
      value: "FRIDAY",
      label: "Viernes",
    },
    {
      value: "SATURDAY",
      label: "Sábado",
    },
    {
      value: "SUNDAY",
      label: "Domingo",
    },
  ];

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
    daysAvailability: [],
    files: [],
  });

  // Estado de los cambios en el formulario
  const [formChanges, setFormChanges] = useState({
    id: isEditing ? id : null,
  });

  const handleDayChange = (day) => {
    if (formState.daysAvailability.includes(day)) {
      const newDays = formState.daysAvailability.filter(
        (selectedDay) => selectedDay !== day
      );
      setFormChanges({ ...formChanges, daysAvailability: newDays });
      setFormState({ ...formState, daysAvailability: newDays });
    } else {
      const newDays = [...formState.daysAvailability, day];
      setFormChanges({ ...formChanges, daysAvailability: newDays });
      setFormState({ ...formState, daysAvailability: newDays });
    }
  };
  useEffect(() => {
    if (isEditing && property) {
      setFormState({
        ...property,
        politicId: property?.politic?.id,
      });
    }
  }, [isEditing, property]);

  const handleImageUpload = async (files) => {


    setPropertyImages([...propertyImages, ...files]);
    // console.log(propertyImages)

    // if (!files.length) return;

    // const formData = new FormData();
    // files.forEach((file) => {
    //   formData.append("files", file);
    // });
    // try {
    //   const response = await uploadImage(id, formData);

    //   queryClient.invalidateQueries("property",id);
    //   toast.success("Imágenes subidas correctamente");


    // } catch (error) {
    //   console.log(error);
    // }
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
    setFormState({
      ...formState,
      prices: [...formState.prices, { description: "", price: "" }],
    });
  };

  const handleDeleteImage = async (id) => {
    try {
      const confirm = window.confirm("¿Estás seguro de eliminar la imagen?");
      if (!confirm) return;
      await deleteImage(id);

      queryClient.invalidateQueries("property",id);
      toast.success("Imagen eliminada correctamente");
    } catch (error) {
      toast.error("Hubo un error al eliminar la imagen");
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    isEditing
      ? mutation.mutate({
          ...formChanges,
        })
      : mutation.mutate({
          ...formState,
          files: propertyImages,
        });
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
            <textarea
              className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Descripción"
              value={formState.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              name="description"
              id="description"
            />

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

          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
            <label className="inline-block text-sm font-medium dark:text-white">
              Dias disponibles
            </label>
            <div className="mt-2 space-y-3">
              <details className="text-sm text-gray-500 hover:text-gray-600">
                <summary className="text-sm text-gray-500 hover:text-gray-600 my-3">
                  Selecciona los días
                </summary>
                {days.map((day) => (
                  <div class="flex items-center mb-4" key={day.value}>
                    <input
                      id={`default-checkbox-${day.value}`}
                      type="checkbox"
                      checked={formState.daysAvailability.includes(day.value)}
                      value={day.value}
                      onChange={() => handleDayChange(day.value)}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for={`default-checkbox-${day.label}`}
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {day.label}
                    </label>
                  </div>
                ))}
              </details>
            </div>
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {isEditing &&
              formState?.images?.map((image) => {
                
                return (
                  <div key={image.url} className="relative group cursor-pointer">
                  <img
                    src={image.url}
                    className="h-full w-full object-cover rounded-md hover:opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50">
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-2 bg-red-500 text-white rounded-full"
                    >
                      <MdOutlineDeleteOutline className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                );
              })}
          </div>

          <div className="py-6 mt-10 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <label className="inline-block text-sm font-medium dark:text-white">
              Imágenes
            </label>
            <div className="mt-2 space-y-3">
              <MultipleImageUpload onUpload={handleImageUpload} />
            </div>
          </div>

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
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
