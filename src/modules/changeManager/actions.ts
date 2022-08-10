import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { CntrtChangeInfo, CntrtChangeInfoConfirm, CommonInfo, ManagerChangeInfo } from './types';

// 액션 정의
export const GET_CONTRACT_LIST = 'changeManager/GET_CONTRACT_LIST';
export const GET_CONTRACT_LIST_SUCCESS = 'changeManager/GET_CONTRACT_LIST_SUCCESS';
export const GET_CONTRACT__LIST_ERROR = 'changeManager/GET_CONTRACT_LIST_ERROR';

export const CLEAR_CNTRT_CHG_INFO_LIST = 'changeManager/CLEAR_CNTRT_CHG_INFO_LIST';
export const CLEAR_CNTRT_CHG_INFO_LIST_SUCCESS = 'changeManager/CLEAR_CNTRT_CHG_INFO_LIST_SUCCESS';
export const CLEAR_CNTRT_CHG_INFO_LIST_ERROR = 'changeManager/CLEAR_CNTRT_CHG_INFO_LIST_ERROR';

export const POST_CNTRT_CHG_INFO = 'changeManager/POST_CNTRT_CHG_INFO';
export const POST_CNTRT_CHG_INFO_SUCCESS = 'changeManager/POST_CNTRT_CHG_INFO_SUCCESS';
export const POST_CNTRT_CHG_INFO_ERROR = 'changeManager/POST_CNTRT_CHG_INFO_ERROR';

export const PUT_CNTRT_CHG_INFO = 'changeManager/PUT_CNTRT_CHG_INFO';
export const PUT_CNTRT_CHG_INFO_SUCCESS = 'changeManager/PUT_CNTRT_CHG_INFO_SUCCESS';
export const PUT_CNTRT_CHG_INFO_ERROR = 'changeManager/PUT_CNTRT_CHG_INFO_ERROR';

export const PUT_CNTRT_CHG_INFO_CONFIRM = 'changeManager/PUT_CNTRT_CHG_INFO_CONFIRM';
export const PUT_CNTRT_CHG_INFO_CONFIRM_SUCCESS = 'changeManager/PUT_CNTRT_CHG_INFO_CONFIRM_SUCCESS';
export const PUT_CNTRT_CHG_INFO_CONFIRM_ERROR = 'changeManager/PUT_CNTRT_CHG_INFO_CONFIRM_ERROR';

export const DELETE_CNTRT_CHG_INFO = 'changeManager/DELETE_CNTRT_CHG_INFO';
export const DELETE_CNTRT_CHG_INFO_SUCCESS = 'changeManager/DELETE_CNTRT_CHG_INFO_SUCCESS';
export const DELETE_CNTRT_CHG_INFO_ERROR = 'changeManager/DELETE_CNTRT_CHG_INFO_ERROR';

export const DELETE_CNTRT_CHG_INFO_CANCEL = 'changeManager/DELETE_CNTRT_CHG_INFO_CANCEL';
export const DELETE_CNTRT_CHG_INFO_CANCEL_SUCCESS = 'changeManager/DELETE_CNTRT_CHG_INFO_CANCEL_SUCCESS';
export const DELETE_CNTRT_CHG_INFO_CANCEL_ERROR = 'changeManager/DELETE_CNTRT_CHG_INFO_CANCEL_ERROR';

export const getContractListAsync = createAsyncAction(
	GET_CONTRACT_LIST,
	GET_CONTRACT_LIST_SUCCESS,
	GET_CONTRACT__LIST_ERROR,
)<string, Array<CommonInfo>, AxiosError>();

export const clearCntrtChgInfoListAsync = createAsyncAction(
	CLEAR_CNTRT_CHG_INFO_LIST,
	CLEAR_CNTRT_CHG_INFO_LIST_SUCCESS,
	CLEAR_CNTRT_CHG_INFO_LIST_ERROR,
)<any, void, AxiosError>();

export const postCntrtChgInfoAsync = createAsyncAction(
	POST_CNTRT_CHG_INFO,
	POST_CNTRT_CHG_INFO_SUCCESS,
	POST_CNTRT_CHG_INFO_ERROR,
)<ManagerChangeInfo, Array<CntrtChangeInfo>, AxiosError>();

export const putCntrtChgInfoAsync = createAsyncAction(
	PUT_CNTRT_CHG_INFO,
	PUT_CNTRT_CHG_INFO_SUCCESS,
	PUT_CNTRT_CHG_INFO_ERROR,
)<CntrtChangeInfoConfirm, boolean, AxiosError>();

export const putCntrtChgInfoConfirmAsync = createAsyncAction(
	PUT_CNTRT_CHG_INFO_CONFIRM,
	PUT_CNTRT_CHG_INFO_CONFIRM_SUCCESS,
	PUT_CNTRT_CHG_INFO_CONFIRM_ERROR,
)<any, CntrtChangeInfo[] | null, AxiosError>();

export const delCntrtChgInfoAsync = createAsyncAction(
	DELETE_CNTRT_CHG_INFO,
	DELETE_CNTRT_CHG_INFO_SUCCESS,
	DELETE_CNTRT_CHG_INFO_ERROR,
)<CntrtChangeInfoConfirm, boolean, AxiosError>();

export const delCntrtChgInfoCancelAsync = createAsyncAction(
	DELETE_CNTRT_CHG_INFO_CANCEL,
	DELETE_CNTRT_CHG_INFO_CANCEL_SUCCESS,
	DELETE_CNTRT_CHG_INFO_CANCEL_ERROR,
)<any, CntrtChangeInfo[] | undefined, AxiosError>();
