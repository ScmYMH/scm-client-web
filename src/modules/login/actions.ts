import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { LoginInfo } from '../../api/loginApi';

// 액션 정의
export const LOGIN_REQUEST = 'login/LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'login/LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_ERROR = 'login/LOGIN_REQUEST_ERROR';

export const loginRequestAsync = createAsyncAction(
	LOGIN_REQUEST,
	LOGIN_REQUEST_SUCCESS,
	LOGIN_REQUEST_ERROR,
)<any, LoginInfo, AxiosError>();
