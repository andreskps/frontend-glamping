import clienteAxios from "../../config/Axios";

export const getProducts = async () => {
  try {
    const response = await clienteAxios.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByProperty = async (propertyId) => {
  try {
    const response = await clienteAxios.get(`/products/property/${propertyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await clienteAxios.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (product) => {
  console.log(product)
  try {
    const response = await clienteAxios.post("/products", product);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProduct = async (product) => {
  const {id,...data} = product;
  try {
    const response = await clienteAxios.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await clienteAxios.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
