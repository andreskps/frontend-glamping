import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import { getPolitics, deletePolitic } from "../../services/politicsService";
import { SpinnerCircle } from "../ui/spinners/SpinnerCircle";

const PoliticsTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: politics,
  } = useQuery({
    queryKey: ["politics"],
    queryFn: () => getPolitics(),
  });

  const mutation = useMutation({
    mutationFn: deletePolitic,
    onSuccess: () => {
      queryClient.invalidateQueries("politics");
      toast.success("Politica eliminada correctamente");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  if (isLoading) return <SpinnerCircle />;

  if (error) return "An error has occurred: " + error.message;

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Descripcion",
      accessorKey: "description",
    },
  ];


  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const handleEdit = (id) => {
    navigate(`/admin/politicas/editar/${id}`);
  };
  return (
    <SimpleTable
      columns={columns}
      data={politics}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default PoliticsTable;
