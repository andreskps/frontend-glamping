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
    // const confirmDeleted = confirm("¿Estás seguro de eliminar esta propiedad?")

    // if(!confirmDeleted) return;

    // mutuation.mutate(id);
    return (
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3xl">
          <label
            htmlFor="modal-2"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Modal title 2</h2>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            dolorum voluptate ratione dicta. Maxime cupiditate, est commodi
            consectetur earum iure, optio, obcaecati in nulla saepe maiores
            nobis iste quasi alias!
          </span>
          <div className="flex gap-3">
            <button className="btn btn-error btn-block">Delete</button>
            <button className="btn btn-block">Cancel</button>
          </div>
        </div>
      </div>
    );
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
