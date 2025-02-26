import { useState, useEffect } from "react";
import Input from "../ui/forms/Input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProduct,
  updateProduct,
  createProduct,
} from "../../services/productsService";
import { usePropertiesStore } from "../../store/propertiesStore";
import { SpinnerCircle } from "../ui/spinners/SpinnerCircle";
const ProductsForm = ({ isEditing }) => {
  const { id } = useParams();

  const getProperty = usePropertiesStore((state) => state.property);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => (isEditing ? getProduct(id) : null),
    enabled: isEditing,
  });

  useEffect(() => {
    if (isEditing && product) {
      setInputs({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [isEditing, product]);

  const handleInputChange = (key, value) => {
    setInputs({
      ...inputs,
      [key]: value,
    });
  };

  const mutation = useMutation({
    mutationFn: isEditing ? updateProduct : createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success(
        `Producto ${isEditing ? "actualizado" : "creado"} correctamente`
      );
      navigate("/admin/productos");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["name", "description", "price", "stock"];

    const hasEmptyFields = requiredFields.some((field) => !inputs[field]);

    if (hasEmptyFields) {
      return toast.error("Por favor, rellena todos los campos");
    }

    let product = {
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
      stock: inputs.stock,
    };

    if (isEditing) product.id = +id;

    mutation.mutate({
      ...product,
      propertyId: getProperty,
    });
  };

  if (isLoading) return <SpinnerCircle />;

  if (error) return `Error: ${error.message}`;

  return (
    <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
            {isEditing ? "Editar" : "Crear"} Producto
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2 space-y-3">
            <Input
              type="text"
              value={inputs.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nombre"
              name="name"
              id="name"
            />
            <Input
              type="text"
              placeholder="Descripción"
              name="description"
              id="description"
              value={inputs.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Precio"
              min="0"
              value={inputs.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              name="price"
              id="price"
            />
            <Input
              type="number"
              min="0"
              value={inputs.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              placeholder="Stock"
              name="stock"
            />
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              className="py-2 px-4 rounded-md border border-gray-300 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => navigate("/admin/productos")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              {isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsForm;
