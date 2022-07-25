import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginProfileInfoProps = {
    loginId: string;
    token: string;
    userId: string;
  };
  
function LoginProfileInfo({ loginId, token, userId }: LoginProfileInfoProps) {
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.setItem("loginId", loginId);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        navigate("/login")
    },[]);

    return (
        <div className="LoginProfileInfo">
            <div className="profile-head">
                <div className="userNm">loginId : {loginId}</div>
                <div className="token">token : {token}</div>
            </div>
        </div>
    );
}
  
  export default LoginProfileInfo;