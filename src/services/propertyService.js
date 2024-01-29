import clienteAxios from "../../config/Axios";

export const getProperties = async () => {
  try {
    const response = await clienteAxios.get("/properties");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPropertiesByOwner = async () => {
  try {
    const response = await clienteAxios.get(`/properties/owner`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProperty = async (property) => {
  const { id, ...rest } = property;
  try {
    const response = await clienteAxios.put(`/properties/${id}`, {
      ...rest,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await clienteAxios.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createProperty = async (property) => {

    const { files, ...data } = property;
    try {

    const response = await clienteAxios.post("/properties", data);
    const { id } = response.data;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    await uploadImage(id,formData)

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await clienteAxios.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (id, files) => {
  try {
    const response = await clienteAxios.post(`/properties/upload/${id}`, files);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await clienteAxios.delete(`/properties/image/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
