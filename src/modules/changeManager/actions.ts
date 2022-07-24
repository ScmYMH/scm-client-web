import { CommonInfo } from 'api/changeManagerAxios';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

// 액션 정의
export const GET_CONTRACT_LIST = 'changeManager/GET_CONTRACT_LIST';
export const GET_CONTRACT_LIST_SUCCESS = 'changeManager/GET_CONTRACT_LIST_SUCCESS';
export const GET_CONTRACT__LIST_ERROR = 'changeManager/GET_CONTRACT_LIST_ERROR';

export const getContractListAsync = createAsyncAction(
	GET_CONTRACT_LIST,
	GET_CONTRACT_LIST_SUCCESS,
	GET_CONTRACT__LIST_ERROR,
)<string, Array<CommonInfo>, AxiosError>();
