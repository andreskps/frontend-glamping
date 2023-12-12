import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Table from "../Table/Table";
import { getProperties } from "../../services/propertyService";

const PropertiesTable = () => {

  const { isLoading, error, data } = useQuery({
    queryKey:["properties"],
    queryFn: getProperties,  
  })


  const propertiesData = [
    { id: 1, name: "Propiedad 1", created: "2023/12/12", status: "Activo" ,image:'https://www.glamping-colombia.com/wp-content/uploads/2019/05/fxff-2.jpg'},
    { id: 2, name: "Propiedad 2", created: "2023/12/12", status: "Inactivo",image:'https://www.glamping-colombia.com/wp-content/uploads/2019/05/fxff-2.jpg' },

  ];

  const propertiesColumns = [
    { label: "#", key: "id" },
    { label: "Nombre", key: "name" },
    // { label: "Creado", key: "created" },
    { label: "Estado", key: "state" },
  ];


  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <Table data={data} colums={propertiesColumns} />;
};

export default PropertiesTable;
