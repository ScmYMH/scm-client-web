import { createAsyncAction } from 'typesafe-actions';
import { LoginProfile } from './login';
import { AxiosError } from 'axios';

export const LOGIN_REQUEST = "login/LOGIN_REQUEST"as const;
export const LOGIN_SUCCESS = "login/LOGIN_SUCCESS"as const;
export const LOGIN_FAIL = "login/LOGIN_FAIL"as const;


export const getUserProfileAsync = createAsyncAction(
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
)<string, LoginProfile, AxiosError>();
