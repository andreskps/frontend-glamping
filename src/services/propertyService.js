import clienteAxios from "../../config/Axios";


export const createProperty = async (property) => {
    try {
        const response = await clienteAxios.post("/properties", property);
        return response.data;
    } catch (error) {
        throw error;
    }
}