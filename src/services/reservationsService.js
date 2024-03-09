import clienteAxios from "../../config/Axios";


export const getReservations = async () => {
    try {
        const response = await clienteAxios.get("/reservations/byOwner");
        return response.data;
    } catch (error) {
    
        throw error;
    }
};

export const getReservationById = async (id) => {
    try {
        const response = await clienteAxios.get(`/reservations/${id}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};