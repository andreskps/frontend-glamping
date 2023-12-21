
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import {
  deleteProduct,
  getProductsByProperty,
} from "../../services/productsService";
import { usePropertiesStore } from "../../store/propertiesStore";
const ProductsTable = () => {
  const property = usePropertiesStore((state) => state.property);
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
    queryKey: ["products", property], // Usamos la propiedad como parte de la clave de la consulta
    queryFn: () => getProductsByProperty(property),
  });


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
    mutation.mutate(id);
  };

  return (
    <SimpleTable
      columns={columns}
      data={data}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProductsTable;
