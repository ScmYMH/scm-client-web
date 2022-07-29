import { asyncState } from 'lib/reducerUtils';
import { createReducer } from 'typesafe-actions';
import {
	DELETE_CNTRT_CHG_INFO,
	DELETE_CNTRT_CHG_INFO_ERROR,
	DELETE_CNTRT_CHG_INFO_SUCCESS,
	GET_CONTRACT_LIST,
	GET_CONTRACT_LIST_SUCCESS,
	GET_CONTRACT__LIST_ERROR,
	POST_CNTRT_CHG_INFO,
	POST_CNTRT_CHG_INFO_ERROR,
	POST_CNTRT_CHG_INFO_SUCCESS,
	PUT_CNTRT_CHG_INFO,
	PUT_CNTRT_CHG_INFO_CONFIRM_SUCCESS,
	PUT_CNTRT_CHG_INFO_ERROR,
	PUT_CNTRT_CHG_INFO_SUCCESS,
} from './actions';
import { ChangeManagerState, ChangeManagerAction } from './types';

const initialState: ChangeManagerState = {
	commonInfoList: asyncState.initial(),
	cntrtChangeInfoList: asyncState.initial(),
	cntrtConfirmResult: asyncState.initial(),
	cntrtCancelResult: asyncState.initial(),
};

const changeManager = createReducer<ChangeManagerState, ChangeManagerAction>(initialState, {
	[GET_CONTRACT_LIST]: (state) => ({
		...state,
		commonInfoList: asyncState.load(),
	}),
	[GET_CONTRACT_LIST_SUCCESS]: (state, action) => ({
		...state,
		commonInfoList: asyncState.success(action.payload),
	}),
	[GET_CONTRACT__LIST_ERROR]: (state, action) => ({
		...state,
		commonInfoList: asyncState.error(action.payload),
	}),
	[POST_CNTRT_CHG_INFO]: (state) => ({
		...state,
		cntrtChangeInfoList: asyncState.load(),
	}),
	[POST_CNTRT_CHG_INFO_SUCCESS]: (state, action) => ({
		...state,
		cntrtChangeInfoList: asyncState.success(action.payload),
	}),
	[POST_CNTRT_CHG_INFO_ERROR]: (state, action) => ({
		...state,
		cntrtChangeInfoList: asyncState.error(action.payload),
	}),
	[PUT_CNTRT_CHG_INFO]: (state) => ({
		...state,
		cntrtConfirmResult: asyncState.load(),
	}),
	[PUT_CNTRT_CHG_INFO_SUCCESS]: (state, action) => ({
		...state,
		cntrtConfirmResult: asyncState.success(action.payload),
	}),
	[PUT_CNTRT_CHG_INFO_ERROR]: (state, action) => ({
		...state,
		cntrtConfirmResult: asyncState.error(action.payload),
	}),
	[PUT_CNTRT_CHG_INFO_CONFIRM_SUCCESS]: (state, action) => ({
		...state,
		cntrtChangeInfoList: asyncState.success(action.payload),
	}),
	[DELETE_CNTRT_CHG_INFO]: (state) => ({
		...state,
		cntrtCancelResult: asyncState.load(),
	}),
	[DELETE_CNTRT_CHG_INFO_SUCCESS]: (state, action) => ({
		...state,
		cntrtCancelResult: asyncState.success(action.payload),
	}),
	[DELETE_CNTRT_CHG_INFO_ERROR]: (state, action) => ({
		...state,
		cntrtCancelResult: asyncState.error(action.payload),
	}),
});

export default changeManager;
