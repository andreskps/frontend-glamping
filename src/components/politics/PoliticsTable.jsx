import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";

const PoliticsTable = () => {
  const data = [
    {
      id: 1,
      name: "Politica 1",
      description: "Descripcion 1",
    },
    {
      id: 2,
      name: "Politica 2",
      description: "Descripcion 2",
    },
    {
      id: 3,
      name: "Politica 3",
      description: "Descripcion 3",
    },
  ];

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
  return <SimpleTable columns={columns} data={data} />;
};

export default PoliticsTable;
