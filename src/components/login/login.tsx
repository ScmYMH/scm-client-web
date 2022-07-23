import { useEffect, useState } from "react";
import { Alert, Button, Form, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { select } from "../../modules/login/login";
import { RootState } from "../../modules";

const Login = () => {
    const loginRedux = useSelector((state: RootState) => state.login);

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [isFail, setIsFail] = useState(false);
  const [user, setUser] = useState({
    loginId: "",
    loginPw: "",
  });

  const onChangeHandler = (e: any) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmitLogin = (e: React.FormEventHandler<HTMLFormElement>) => {
    dispatch(select({ loginId: user.loginId, loginPw: user.loginPw }));
    console.log(user);
  };

  const closeAlert = () => {
    setIsFail(false);
  };

  return (
    <div className="body">
      <div className="form-box">
        <div className="login">
          <div>
            <h1>LOGIN</h1>
            <Form onSubmit={onSubmitLogin} className="LoginForm">
              {isFail ? (
                <Alert color="warning" toggle={() => closeAlert()}>
                  아이디 또는 비밀번호가 틀렸습니다.
                </Alert>
              ) : null}
              <Input
                className="LoginInput"
                placeholder="  ID"
                name="loginId"
                id="loginId"
                onChange={onChangeHandler}
              ></Input>
              <br />
              <Input
                className="LoginInput"
                type="password"
                placeholder="  password"
                name="loginPw"
                id="loginPw"
                onChange={onChangeHandler}
              ></Input>
              <br />
              <Input id="terms" type="checkbox" />
              <label htmlFor="terms"></label>
              <span>remember ID</span>
              <Button className="LoginButton" type="submit" color="primary">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;