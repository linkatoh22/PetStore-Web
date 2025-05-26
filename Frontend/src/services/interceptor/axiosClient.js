import axios from "axios";
import { resetAccessToken } from "../api/HandleAccessTokenAPI";

const setUpAxiosInterceptors = ()=>{
    axios.interceptors.response.use(
        (response)=>response,

        async(error)=>{
            console.log("Axios Interceptor Error: ", error.response.status);
            
            var  originalRequest = error.config;
            
            console.log(`${originalRequest.useAuth} ${error.response.status} ${originalRequest._retry}`)


            if(originalRequest.useAuth && error.response.status === 401 && !originalRequest._retry){

                
                await resetAccessToken();
                const newToken = localStorage.getItem("accessToken");
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                return axios(originalRequest)
                



            }
            return Promise.reject(error);

        }


    )
}

export default setUpAxiosInterceptors;