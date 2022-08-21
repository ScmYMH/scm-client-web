import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { loginRequestAsync } from "../../modules/login/actions";
import LoginForm from "./LoginForm";
import LoginProfileInfo from "./LoginProfileInfo";

const LoginLoader = () => {
    const { data, loading, error } = useSelector((state: RootState) => state.login.loginInfo);
    const dispatch = useDispatch()

    const onSubmitLoginId = (loginId: string, loginPw: string) => {
        const params = { 
            "loginId" : loginId,
            "loginPw" : loginPw
        };
        dispatch(loginRequestAsync.request(params));
    };

    return (
        <>
            <LoginForm onSubmitLoginId={onSubmitLoginId} />
            {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
            {error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
            {data && <LoginProfileInfo token={data.token} userId={data.userId} userNm={data.userNm} loginId={data.loginId} />}
        </>
    );
}

export default LoginLoader;