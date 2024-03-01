import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-hot-toast";
import { usePropertiesStore } from "../../store/propertiesStore";
import {
  getPropertiesByOwner,
  deleteProperty,
} from "../../services/propertyService";
import SimpleTable from "../Table/SimpleTable";
import CardTable from "../Table/CardTable";
import { SpinnerCircle } from "../ui/spinners/SpinnerCircle";

const PropertiesTable = () => {
  const navigate = useNavigate();
  const setProperties = usePropertiesStore((state) => state.setProperties);

  const queryClient = useQueryClient();
  const mutuation = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries("properties");
      toast.success("Propiedad eliminada correctamente");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ["properties"],
    queryFn: getPropertiesByOwner,
  });

  const colums = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Ubicación",
      accessorKey: "location",
    },
    {
      header: "Estado",
      accessorKey: "state",
    },
  ];

  const handleEdit = (id) => {
    navigate(`/admin/propiedades/editar/${id}`);
  };

  const handleDelete = (id) => {
    mutuation.mutate(id);
  };

  if (isLoading) return <SpinnerCircle/>

  if (error) return "An error has occurred: " + error.message;

  if (isSuccess) {
  
    setProperties(data);
  }

  return (
    // <SimpleTable
    //   data={data}
    //   columns={colums}
    //   handleEdit={handleEdit}
    //   handleDelete={handleDelete}
    // />
    <>
      <div class="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Mis Propiedades
          </h2>
        </div>

        <div class="inline-flex gap-x-2">
          <Link
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            to="crear"
          >
            <IoIosAdd className="flex-shrink-0 w-6 h-6" />
            Crear
          </Link>
        </div>
      </div>

      <CardTable
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default PropertiesTable;
