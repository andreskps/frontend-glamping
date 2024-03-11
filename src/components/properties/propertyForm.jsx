// PropertyForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Select from "react-select";

import { MdOutlineDeleteOutline } from "react-icons/md";
import MultipleImageUpload from "../MultipleImageUpload";
import MapView from "../map/MapView";
import {
  getProperty,
  createProperty,
  updateProperty,
  uploadImage,
  deleteImage,
} from "../../services/propertyService";

import Input from "../ui/forms/Input";
import Button from "../ui/forms/Button";
import { SpinnerCircle } from "../ui/spinners/SpinnerCircle";
import { getPolitics } from "../../services/politicsService";

const PropertyForm = ({ isEditing }) => {
  const { id } = useParams();
  const [propertyImages, setPropertyImages] = useState([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const categories = ["CABAÑA", "CHALET", "YURTA", "CASA_ARBOL", "DOMO"];

  const {
    isLoading,
    error,
    data: property,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => (isEditing ? getProperty(id) : null),
    enabled: isEditing,
  });

  const {
    isLoading: logadingPolitics,
    error: errorPolitics,
    data: politics,
  } = useQuery({
    queryKey: ["politics"],
    queryFn: () => getPolitics(),
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
    capacity: "",
    politicId: "",
    prices: [],
    daysAvailability: [],
    files: [],
    location: {
      lat: 0,
      lon: 0,
      displayName: "",
    },
  });

  // Estado de los cambios en el formulario
  const [formChanges, setFormChanges] = useState({
    id: isEditing ? id : null,
  });

  const handleLocationSelect = async (result) => {
    const newLocationSelected = result;

    if (isEditing) {
      return setFormChanges({ ...formChanges, location: newLocationSelected });
    }

    setFormState((prevState) => ({
      ...prevState,
      location: newLocationSelected,
    }));
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
    if (!files.length) return;

    if (!isEditing) return; // Si no está editando, no subir las imágenes hasta que le den crear

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const response = await uploadImage(id, formData);

      queryClient.invalidateQueries("property", id);
      toast.success("Imágenes subidas correctamente");
    } catch (error) {
      toast.error("Hubo un error al subir las imágenes");
    }
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

  const validateForm = (formState, fieldsRequired) => {
    const errors = {};
  
    fieldsRequired.forEach((field) => {
      if (!formState[field] || formState[field].length === 0) {
        errors[field] = `El campo ${field} es requerido`;
      }
  
      // Agrega aquí más validaciones según sea necesario
      // Por ejemplo, si quieres validar que la capacidad sea un número:
      // if (field === 'capacity' && typeof formState[field] !== 'number') {
      //   errors[field] = `La capacidad debe ser un número`;
      // }
    });
  
    return errors;
  };

  const handleDeleteImage = async (id) => {
    try {
      if (formState?.images?.length === 1) {
        toast.error("Debes dejar al menos una imagen");
        return;
      }

      const confirm = window.confirm("¿Estás seguro de eliminar la imagen?");
      if (!confirm) return;
      await deleteImage(id);

      queryClient.invalidateQueries("property", id);
      toast.success("Imagen eliminada correctamente");
    } catch (error) {
      toast.error("Hubo un error al eliminar la imagen");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();


    if (formState?.files?.length === 0 && !isEditing) {
      toast.error("Debes subir al menos una imagen");
      return;
    }

    const fieldsRequired = [
      "name",
      "description",
      "capacity",
      "politicId",
      "category", 
      "location",
      "prices",
      "daysAvailability",
      "files"
    ];

    const errors = validateForm(formState, fieldsRequired);

    if (Object.keys(errors).length > 0) {
      toast.error("Debes completar todos los campos");
      return;
    }


    isEditing
      ? mutation.mutate({
          ...formChanges,
        })
      : mutation.mutate({
          ...formState,
      
        });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const fieldsRequired = [
      "name",
      "description",
      "capacity",
      "politicId",
      "category", 
      "location",
      "prices",
      "daysAvailability",
    ];

    const errors = validateForm(formState, fieldsRequired);

    if (Object.keys(errors).length > 0) {
      toast.error("Debes completar todos los campos");
      return;
    }

    mutation.mutate({
      ...formChanges,
    });
  }

  if (isLoading || logadingPolitics) return <SpinnerCircle />;

  if (error || errorPolitics)
    return <p>Hubo un error al cargar la propiedad</p>;


  return (
    <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
            {isEditing ? "Editar" : "Crear"} propiedad
          </h2>
        </div>
        <form onSubmit={
          isEditing ? handleUpdate : handleCreate
        }>
          <div className="mt-2 space-y-3">
            <Input
              type="text"
              placeholder="Nombre de la propiedad"
              name="name"
              label="Nombre"
              required
              id="name"
              value={formState.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <div>
              <label className="inline-block text-sm font-medium dark:text-white mb-1">
                Descripción
              </label>
              <textarea
                className="py-2 px-3 pe-11 block w-full border border-gray-600 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Descripción"
                label="Descripción"
                value={formState.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                name="description"
                id="description"
              />
            </div>

            <div>
              <label className="inline-block text-sm font-medium dark:text-white mb-1">
                Categoría
              </label>

              <Select
                placeholder="Selecciona una categoria"
                options={categories.map((category) => ({
                  value: category,
                  label: category,
                }))}
                value={
                  formState?.category
                    ? {
                        value: formState.category,
                        label: formState.category,
                      }
                    : null
                }
                onChange={(selected) => {
                  setFormChanges({ ...formChanges, category: selected.value });
                  setFormState({ ...formState, category: selected.value });
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderRadius: "10px",
                    borderColor: "#9e9e9e",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#9e9e9e",
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#9e9e9e"
                      : state.isFocused
                      ? "#f1f1f1"
                      : null,
                  }),
                }}
              />
            </div>

            <MapView
              handleLocation={handleLocationSelect}
              currentLocation={
                isEditing
                  ? {
                      lat: property.location.lat,
                      lon: property.location.lon,
                      displayName: property.location.displayName,
                    }
                  : null
              }
            />

            <Input
              type="number"
              placeholder="Capacidad"
              name="capacity"
              id="capacity"
              required
              min="1"
              label="Capacidad"
              value={formState.capacity}
              onChange={(e) => handleInputChange("capacity", e.target.value)}
            />

            <div>
              <label className="inline-block text-sm font-medium dark:text-white">
                Seleccione una política
              </label>

              <Select
                placeholder="Selecciona una política"
                options={politics.map((politic) => ({
                  value: politic.id,
                  label: politic.name,
                }))}
                value={
                  formState?.politicId
                    ? {
                        value: formState.politicId,
                        label: politics.find(
                          (p) => p.id === formState.politicId
                        )?.name,
                      }
                    : null
                }
                onChange={(selected) => {
                  setFormChanges({ ...formChanges, politicId: selected.value });
                  setFormState({ ...formState, politicId: selected.value });
                }}
              />
            </div>
          </div>

          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
            <label className="inline-block text-sm font-medium dark:text-white m-2">
              Dias disponibles
            </label>
            <Select
              isMulti
              placeholder="Selecciona los días disponibles"
              options={days}
              value={formState.daysAvailability.map((day) => {
                return days.find((d) => d.value === day);
              })}
              onChange={(selected) => {
                const selectedDays = selected.map((day) => day.value);
                setFormChanges({
                  ...formChanges,
                  daysAvailability: selectedDays,
                });
                setFormState({ ...formState, daysAvailability: selectedDays });
              }}
            />
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
                    required
                    value={price.description}
                    name="description"
                    onChange={(e) =>
                      handlePriceChange(index, "description", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Precio"
                    required
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
                className="text-sm text-white
            
                  focus:outline-none  rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 mt-2 bg-green-600 dark:bg-slate-800 hover:bg-green-700 dark:hover:bg-gray-700 transition-colors duration-200 ease-in-out
                 "
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
                  <div
                    key={image.url}
                    className="relative group cursor-pointer"
                  >
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
              <MultipleImageUpload onUpload={handleImageUpload} formState={formState} setFormState={setFormState} isEditing={isEditing}/>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-x-2">
            <Button
              type="button"
              className="border-gray-300 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => {
                navigate("/admin/propiedades");
                window.scrollTo(0, 0);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 dark:bg-slate-800 dark:hover:bg-gray-700"
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
