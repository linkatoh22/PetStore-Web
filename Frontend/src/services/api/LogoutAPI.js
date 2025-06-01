import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LogoutAPI = async()=>{
    try{
        const response = await axios.post(`${BASE_URL}/auth/log-out`,{},
            {withCredentials:true}
        )
        return response.data;
    }
    catch(error){
        console.error("Lỗi khi fetch data:",error);
        throw error;
    }
}