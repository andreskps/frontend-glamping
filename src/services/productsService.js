import clienteAxios from "../../config/Axios";

export const getProducts = async () => {
  try {
    const response = await clienteAxios.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};
