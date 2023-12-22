import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import { getServicesByProperty ,deleteService} from "../../services/servicesService";
import { usePropertiesStore } from "../../store/propertiesStore";
const ServicesTable = () => {
  const property = usePropertiesStore((state) => state.property);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["services", property],
    queryFn: () => getServicesByProperty(property),
  });

  const mutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      toast.success("Servicio eliminado correctamente");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

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
  ];

  const handleEdit = (id) => {
    navigate(`/admin/servicios/editar/${id}`);
  };

  const handleDelete = (id) => {
    mutation.mutate(id);
  }

  return <SimpleTable columns={columns} data={data}  handleEdit={handleEdit} handleDelete={handleDelete}/>;
};

export default ServicesTable;
