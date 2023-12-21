import clienteAxios from "../../config/Axios"

export const getServicesByProperty = async (propertyId) => {

    try {
        const response = await clienteAxios.get(`/services/property/${propertyId}`);
        console.log(response.data)
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
