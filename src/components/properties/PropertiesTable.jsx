import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPropertiesByOwner} from "../../services/propertyService";
import SimpleTable from "../Table/SimpleTable";


const PropertiesTable = () => {


  const { isLoading, error, data } = useQuery({
    queryKey:["properties"],
    queryFn: getPropertiesByOwner
  })

  const colums = [
       {
      header: "ID",
      accessorKey: "id",
       },{
      header: "Nombre",
      accessorKey: "name",
       },{
         header: "Ubicación",
          accessorKey: "location",
        },{
          header: "Estado",
          accessorKey: "state",

       }
  ];

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <SimpleTable data={data} columns={colums} />;
};

export default PropertiesTable;
