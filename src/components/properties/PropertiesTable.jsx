import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getPropertiesByOwner,
  deleteProperty,
} from "../../services/propertyService";
import SimpleTable from "../Table/SimpleTable";

const PropertiesTable = () => {
  const navigate = useNavigate();

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

  const { isLoading, error, data } = useQuery({
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

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <SimpleTable
      data={data}
      columns={colums}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default PropertiesTable;
