import React from "react";
import Table from "../Table/Table";

const PropertiesTable = () => {
  const propertiesData = [
    { id: 1, name: "Propiedad 1", created: "2023/12/12", status: "Activo" ,image:'https://www.glamping-colombia.com/wp-content/uploads/2019/05/fxff-2.jpg'},
    { id: 2, name: "Propiedad 2", created: "2023/12/12", status: "Inactivo",image:'https://www.glamping-colombia.com/wp-content/uploads/2019/05/fxff-2.jpg' },

  ];

  const propertiesColumns = [
    { label: "ID", key: "id" },
    {label: "Imagen", key: "image"},
    { label: "Nombre", key: "name" },
    { label: "Creado", key: "created" },
    { label: "Estado", key: "status" },
  ];
  return <Table data={propertiesData} colums={propertiesColumns} />;
};

export default PropertiesTable;
