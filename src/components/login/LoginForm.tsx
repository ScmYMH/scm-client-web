import React, { FormEvent, useState, ChangeEvent } from 'react';
import { Alert, Button, Form, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../modules";
import './login.css';

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
    <Form onSubmit={onSubmit} className="LoginForm">
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
        onChange={onChange}
      ></Input>
      <br />
      <Input
        className="LoginInput"
        type="password"
        placeholder="  password"
        name="loginPw"
        id="loginPw"
        onChange={onChange}
      ></Input>
      <br />
      <Input id="terms" type="checkbox" />
      <label htmlFor="terms"></label>
      <span>remember ID</span>
      <Button className="LoginButton" type="submit" color="primary">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;