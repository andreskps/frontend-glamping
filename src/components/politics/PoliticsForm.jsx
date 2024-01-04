import { useState, useEffect } from "react";
import Input from "../ui/forms/Input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PoliticsForm = ({ isEditing }) => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    details: [
      {
        cancellation: {
          status: false,
          days_prevent: 0,
          penalty: 0,
        },
        check_in: {
          hour: "",
        },
        check_out: {
          hour: "",
        },
      },
    ],
  });

  const handleInputChange = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    const newPolitic = {
        name: data.name,
        description: data.description,
        details: [
            {
            cancellation: {
                status: data.cancellation ? true : false,
                days_prevent: data.days_prevent,
                penalty: data.penalty,
            },
            check_in: {
                hour: data.check_in,
            },
            check_out: {
                hour: data.check_out,
            },
            },
        ],
    }    
  };

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
            />
            <Input
              placeholder="Descripción"
              name="description"
              id="description"
              type="text"
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
                />
                <Input
                    type="number"
                    placeholder="Días de anticipación"
                    name="days_prevent"
                    id="days_prevent"
                />

                <Input
                    type="number"
                    placeholder="Penalidad"
                    name="penalty"
                    id="penalty"
                />

                <Input
                    type="time"
                    placeholder="Hora de entrada"
                    name="check_in"
                    id="check_in"

                />

                <Input
                    type="time"
                    placeholder="Hora de salida"
                    name="check_out"
                    id="check_out"
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
