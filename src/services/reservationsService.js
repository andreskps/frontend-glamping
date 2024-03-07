import clienteAxios from "../../config/Axios";


export const getReservations = async () => {
    try {
        const response = await clienteAxios.get("/reservations/byOwner");
        return response.data;
    } catch (error) {
        throw error;
    }
};