import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { setConstantValue } from 'typescript';
import { login } from '../../services/authService';

// yup : 유효성 검증 해주는 라이브러리
// formik : form action 처리 라이브러리, 타입스크립트를 잘 지원

interface UserProps{
    loginId: string,
    loginPw: string,
}

interface State {
    
    loading: boolean,
    message: string
};
  

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        loginId: "",
        loginPw: "",
      };

    const [user, setUser] = useState<UserProps | null>( {
        loginId: "",
        loginPw: "",
    });

    const [state, setState] = useState<State | null>( {
        loading: false,
        message: ""
    });
    
    const validationSchema = () => {
        return Yup.object().shape({
            loginId: Yup.string().required("This field is required!"),
            password: Yup.string().required("This field is required!"),
        });
    }

    const handleLogin = (formValue: {loginId: string; loginPw: string}) => {
        const {loginId, loginPw} = formValue;
        
        setState({
            message: "",
            loading: true
        });

        login({loginId, loginPw}).then(
            () => {
                navigate("/contract");
                window.location.reload();
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setState({
                loading: false,
                message: resMessage
              });
            }
          );
    }

     return (
        
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {state?.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
              {state?.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {state?.message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
}