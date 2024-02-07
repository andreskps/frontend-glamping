import { useState, useEffect } from "react";
import Input from "../ui/forms/Input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePropertiesStore } from "../../store/propertiesStore";
import {
  getService,
  updateService,
  createService,
} from "../../services/servicesService";
import { SpinnerCircle } from "../ui/spinners/SpinnerCircle";
const ServicesForm = ({ isEditing }) => {
  const { id } = useParams();

  const getProperty = usePropertiesStore((state) => state.property);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    propertyId: getProperty
  });

  const {
    isLoading,
    error,
    data: service,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: () => (isEditing ? getService(id) : null),
    enabled: isEditing,
  });

  useEffect(() => {
    if (isEditing && service) {
      setInputs({	
        name: service.name,
        description: service.description,
        price: service.price,
        propertyId: service.propertyId
      });
    }
  }, [isEditing, service]);

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const mutation = useMutation({
    mutationFn: isEditing ? updateService : createService,
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      toast.success(
        `Servicio ${isEditing ? "actualizado" : "creado"} correctamente`
      );
      navigate("/admin/servicios");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let service = {
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
      propertyId: inputs.propertyId
    };

    if (isEditing) service.id = +id;


    mutation.mutate(service);
  };

  if (isLoading) return <SpinnerCircle />;

  if (error) return <div>Ha ocurrido un error: {error.message}</div>;

  return (
    <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
            {isEditing ? "Editar" : "Crear"} Servicio
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2 space-y-3">
            <Input
              label="Nombre"
              name="name"
              value={inputs.name}
              placeholder="Nombre del servicio"
              onChange={
                (e) => handleInputChange(e.target.name, e.target.value)
              }
            />

            <Input
              label="Descripción"
              name="description"
              placeholder="Descripción del servicio"
              value={inputs.description}
              onChange={
                (e) => handleInputChange(e.target.name, e.target.value)
              }
            />

            <Input
              label="Precio"
              name="price"
              placeholder="Precio del servicio"
              value={inputs.price}
              onChange={
                (e) => handleInputChange(e.target.name, e.target.value)
              }
            />
          </div>
          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              className="py-2 px-4 rounded-md border border-gray-300 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => navigate("/admin/servicios")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ServicesForm;
