import React, { FormEvent, useState, ChangeEvent } from "react";
import { Alert, Button, Form, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../modules";
import "./login.css";

interface loginFormProps {
  onSubmitLoginId: (loginId: string, loginPw: string) => void;
}

const LoginForm = ({ onSubmitLoginId }: loginFormProps) => {
  const [isFail, setIsFail] = useState(false);
  const [user, setUser] = useState({
    loginId: "",
    loginPw: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitLoginId(user.loginId, user.loginPw);
  };

  const closeAlert = () => {
    setIsFail(false);
  };

  return (
    <div
      className="body"
      style={{
        width: "100%",
        padding: "0",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#005586",
      }}
    >
      <div
        className="form-box"
        style={{
          width: "30%",
          height: "600px",
          backgroundColor: "white",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={"../../images/posco_ict_logi.png"}
          alt="Logo"
          style={{ width: 200 }}
        ></img>
        <div className="login" style={{ marginTop: 50 }}>
          <div>
            <Form onSubmit={onSubmit} className="LoginForm">
              {isFail ? (
                <Alert color="warning" toggle={() => closeAlert()}>
                  아이디 또는 비밀번호가 틀렸습니다.
                </Alert>
              ) : null}
              <div style={{ marginTop: "20px", width: "80%" }}>
                <h4>ID</h4>
                <Input
                  style={{ width: 400 }}
                  className="LoginInput"
                  placeholder="  ID"
                  name="loginId"
                  id="loginId"
                  onChange={onChange}
                ></Input>
              </div>
              <div style={{ marginTop: "20px", width: "80%" }}>
                <h4>Password</h4>{" "}
                <Input
                  style={{ width: 400 }}
                  className="LoginInput"
                  type="password"
                  placeholder="  password"
                  name="loginPw"
                  id="loginPw"
                  onChange={onChange}
                ></Input>
              </div>

              <div
                style={{
                  marginTop: "50px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button
                  className="LoginButton"
                  type="submit"
                  color="primary"
                  style={{
                    width: "100%",
                    height: "50px",
                    border: 0,
                    outline: "none",
                    borderRadius: "40px",
                    fontSize: "1.2em",
                    letterSpacing: "2px",
                    backgroundColor: "#f38901",
                  }}
                >
                  로그인
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
