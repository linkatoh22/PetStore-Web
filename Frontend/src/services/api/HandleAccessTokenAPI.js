import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const resetAccessToken = async()=>{
    try{
        const response = await axios.post(`${BASE_URL}/auth/reset-access-token`,
            {},
            {withCredentials:true}
        );

        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken",accessToken)
    }
    catch(error){
        console.error("Reset token failed, redirecting to login...", error);
        alert("Phiên đăng nhập hết hạn... Vui lòng đăng nhập lại")
        window.location.href = '/login';
        throw error;
        
    }


}