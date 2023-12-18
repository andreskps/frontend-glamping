import React from "react";
import data from "../../../data/products.json";
import {useQuery} from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import { getProducts } from "../../services/productsService";

const ProductsTable = () => {

  const { isLoading, error, data } = useQuery({
    queryKey:["products"],
    queryFn: getProducts
  })
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
      header: "Stock",
      accessorKey: "stock",
    },

  ];

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);
  return (
   
          <SimpleTable columns={columns} data={data} />
 
  );
};

export default ProductsTable;
