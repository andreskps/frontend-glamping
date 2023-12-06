import clienteAxios from "../../config/Axios";

export const login = async (data) => {
  try {
    const response = await clienteAxios.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;

  }
};

export const profile = async () => {
  try {
    const response = await clienteAxios.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};


