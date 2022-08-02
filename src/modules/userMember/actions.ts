import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { UserMemberInfo } from 'api/userMember';

export const GET_USER_LIST = 'userMember/GET_USER_LIST';
export const GET_USER_LIST_SUCCESS = 'userMember/GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_ERROR = 'userMember/GET_USER_LIST_ERROR';

export const getUserMemberAsync = createAsyncAction(GET_USER_LIST, GET_USER_LIST_SUCCESS, GET_USER_LIST_ERROR)<
	any,
	Array<UserMemberInfo>,
	AxiosError
>();
