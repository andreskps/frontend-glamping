import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import { getPolitics } from "../../services/politicsService";

const PoliticsTable = () => {

  const navigate = useNavigate();


const {isLoading, error, data:politics} = useQuery({
    queryKey: ["politics"],
    queryFn: () => getPolitics(),
    });

    if (isLoading) return "Loading...";

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

  const handleEdit = (id) => {
    navigate(`/admin/politicas/editar/${id}`);
  };
  return <SimpleTable columns={columns} data={politics} handleEdit={handleEdit} />;
};

export default PoliticsTable;
