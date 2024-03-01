import clienteAxios from "../../config/Axios";

export const getPolitics = async () => {
  try {
    const response = await clienteAxios.get("/politics/byOwner");

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPolitic = async (id) => {
  try {
    const response = await clienteAxios.get(`/politics/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPolitic = async (politic) => {
  try {
    const response = await clienteAxios.post("/politics", politic);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePolitic = async (politic) => {
  const { id, ...data } = politic;
  try {
    const response = await clienteAxios.put(`/politics/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deletePolitic = async (id) => {
  try {
    const response = await clienteAxios.delete(`/politics/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
