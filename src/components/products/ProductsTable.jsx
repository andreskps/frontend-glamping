import React from "react";
import { Link } from "react-router-dom";
import data from "../../../data/products.json";
import SimpleTable from "../Table/SimpleTable";

const ProductsTable = () => {
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "Product ID",
    },
    {
      header: "Name",
      accessorKey: "name",
      footer: "Product Name",
    },
    {
      header: "Price",
      accessorKey: "price",
      footer: "Product Price",
    },
    {
      header: "Description",
      accessorKey: "description",
      footer: "Product Description",
    },
    {
      header: "Estado",
      accessorKey: "status",
      footer: "Product Status",
    },
  ];

  return (
   
          <SimpleTable columns={columns} data={data} />
 
  );
};

export default ProductsTable;
