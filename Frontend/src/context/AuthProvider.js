import { createContext,useState,useEffect, Children } from "react";

export const AuthContext=createContext();

export function AuthProvider ({Children}){
    const [accessToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
    
    const login = (token) =>{
        setAccessToken(token);
        localStorage.setItem('accessToken',token)
    }

    const logout = ()=>{
        setAccessToken(null);
        localStorage.removeItem('accessToken')
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            setAccessToken(token);
        }
    }, []);

    return(
        <AuthContext.Provider value={{accessToken,login,logout}}>

        </AuthContext.Provider>
    )
}