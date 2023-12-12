import clienteAxios from "../../config/Axios";



export const getProperties = async ()=>{

    console.log("getProperties");
    try {

       const response = await clienteAxios.get("/properties");
       return response.data;
    } catch (error) {
        throw error;
    }
}


export const createProperty = async (property) => {
    try {
        const response = await clienteAxios.post("/properties", property);
        return response.data;
    } catch (error) {
        throw error;
    }
}