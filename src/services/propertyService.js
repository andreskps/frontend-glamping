import clienteAxios from "../../config/Axios";



export const getProperties = async ()=>{

    try {

       const response = await clienteAxios.get("/properties");
       return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPropertiesByOwner = async () => {
    try {
        const response = await clienteAxios.get(`/properties/owner`);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const updateProperty = async (property) => {
    
    try {
        const response = await clienteAxios.put(`/properties/${property.id}`, {
            name: property.name,
            description: property.description,
            location: property.location,
            capacity: property.price,
            prices: property.prices,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getProperty = async (id) => {
    try {
        const response = await clienteAxios.get(`/properties/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
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