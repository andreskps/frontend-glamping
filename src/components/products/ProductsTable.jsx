import React from "react";
import data from "../../../data/products.json";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import { getProducts ,deleteProduct,getProductsByProperty} from "../../services/productsService";

const ProductsTable = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("Producto eliminado correctamente");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey:["products"],
    queryFn: getProductsByProperty
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

  const handleEdit = (id) => {
    navigate(`/admin/productos/editar/${id}`);
  };

  const handleDelete = (id) => {
    console.log(id);
    mutation.mutate(id);
  };

  return (
   
          <SimpleTable columns={columns} data={data} handleEdit={handleEdit} handleDelete={handleDelete}/>
 
  );
};

export default ProductsTable;
