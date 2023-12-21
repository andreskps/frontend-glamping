import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SimpleTable from "../Table/SimpleTable";
import { getServicesByProperty } from "../../services/servicesService";
import { usePropertiesStore } from "../../store/propertiesStore";
const ServicesTable = () => {
  const property = usePropertiesStore((state) => state.property);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["services", property],
    queryFn: () => getServicesByProperty(property),
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

  return <SimpleTable columns={columns} data={data} />;
};

export default ServicesTable;
