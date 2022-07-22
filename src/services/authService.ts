import axios from "axios";
const API_URL = "http://localhost:9000/api/auth/";

interface loginProps {
    loginId: string;
    loginPw: string;
};

export const login = ({loginId, loginPw}: loginProps) => {
    return axios.post(API_URL + "signin", {
        loginId, loginPw
    })
    .then(response => {
        if (response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
}

export const logout = () =>{
    localStorage.removeItem("user");
}

export const getCurrentUser = () =>{
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
}
