import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginProfileInfoProps = {
    loginId: string;
    token: string;
    userId: string;
    userNm: string;
    employeeNumber: string;
  };
  
function LoginProfileInfo({ loginId, token, userId, userNm, employeeNumber }: LoginProfileInfoProps) {
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.setItem("loginId", loginId);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userNm", userNm);
        localStorage.setItem("employeeNumber", employeeNumber);
        navigate("/coa")
    },[]);

    return (
        <>
        {console.log("Login Success")};
        <div className="LoginProfileInfo">
            <div className="profile-head">
                {/* <div className="userNm">userNm : {userNm}</div>
                <div className="token">token : {token}</div> */}
                
            </div>
        </div>
        </>
    );
}
  
  export default LoginProfileInfo;