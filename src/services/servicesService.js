import clienteAxios from "../../config/Axios"

export const getServicesByProperty = async (propertyId) => {

    try {
        const response = await clienteAxios.get(`/services/property/${propertyId}`);
  
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getService = async (id) => {
    try {
        const response = await clienteAxios.get(`/services/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createService = async (service) => {
    try {
        const response = await clienteAxios.post(`/services`, service);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateService = async (service) => {
    const serviceUpdate = {
        name: service.name,
        description: service.description,
        price: service.price,
        propertyId: service.propertyId
    }
    try {
        const response = await clienteAxios.put(`/services/${service.id}`, serviceUpdate);
        return response.data;
    } catch (error) {
        throw error;
    }
}
