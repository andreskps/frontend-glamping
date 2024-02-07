import { useState, useEffect } from "react";
import Input from "../ui/forms/Input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPolitic,
  updatePolitic,
  getPolitic,
} from "../../services/politicsService";

const PoliticsForm = ({ isEditing }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    cancellation: false,
    check_in: "",
    check_out: "",
    days_prevents: "",
    penalty: "",
  });

  const {
    isLoading,
    error,
    data: politic,
  } = useQuery({
    queryKey: ["politic", id],
    queryFn: () => (isEditing ? getPolitic(id) : null),
    enabled: isEditing,
  });

  useEffect(() => {
    if (isEditing && politic) {
      setInputs({
        name: politic.name,
        description: politic.description,
        cancellation: politic.details.cancellation?.status,
        check_in: politic.details.check_in?.hour,
        check_out: politic.details.check_out?.hour,
        days_prevents: politic.details.cancellation?.days_prevents,
        penalty: politic.details.cancellation?.penalty,
      });
    }
  }, [isEditing, politic]);

  const mutation = useMutation({
    mutationFn: isEditing ? updatePolitic : createPolitic,
    onSuccess: () => {
      queryClient.invalidateQueries("politics");
      toast.success(
        `Politica ${isEditing ? "actualizada" : "creada"} correctamente`
      );
      navigate("/admin/politicas");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleInputChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let politic = {
      name: inputs.name,
      description: inputs.description,
      details: {
        cancellation: {
          status: inputs.cancellation ? true : false,
          days_prevents: inputs.days_prevents,
          penalty: inputs.penalty,
        },
        check_in: {
          hour: inputs.check_in,
        },
        check_out: {
          hour: inputs.check_out,
        },
      },
    };

    if (isEditing) politic.id = +id;

    mutation.mutate({
      ...politic,
    });
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
            {isEditing ? "Editar" : "Crear"} Politica
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2 space-y-3">
            <Input
              type="text"
              placeholder="Nombre"
              name="name"
              id="name"
              value={inputs.name}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            <Input
              placeholder="Descripción"
              name="description"
              id="description"
              type="text"
              value={inputs.description}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Detalles
            </h3>

            <div className="mt-2 space-y-3">
              <Input
                type="checkbox"
                name="cancellation"
                id="cancellation"
                checked={inputs.cancellation}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.checked)
                }
              />
              <Input
                type="number"
                placeholder="Días de anticipación"
                name="days_prevents"
                value={inputs.days_prevents}
                id="days_prevents"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />

              <Input
                type="number"
                placeholder="Penalidad"
                value={inputs.penalty}
                name="penalty"
                id="penalty"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />

              <Input
                type="time"
                placeholder="Hora de entrada"
                value={inputs.check_in}
                name="check_in"
                id="check_in"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />

              <Input
                type="time"
                placeholder="Hora de salida"
                name="check_out"
                value={inputs.check_out}
                id="check_out"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
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

export default PoliticsForm;
