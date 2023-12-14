import React from "react";
import Input from "../forms/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductsForm = ({ isEditing }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const requiredFields = ["name", "description", "price"];

    const hasEmptyFields = requiredFields.some((field) => !data[field]);

    if (hasEmptyFields) {
      return toast.error("Por favor, rellena todos los campos");
    }
    console.log(data);
  };
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
            <Input type="text" placeholder="Nombre" name="name" id="name" />
            <Input
              type="text"
              placeholder="Descripción"
              name="description"
              id="description"
            />
            <Input type="text" placeholder="Precio" name="price" id="price" />
            <Input type="number" placeholder="Stock" name="stock" />
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
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
