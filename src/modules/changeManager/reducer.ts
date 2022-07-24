import { asyncState } from 'lib/reducerUtils';
import { createReducer } from 'typesafe-actions';
import { GET_CONTRACT_LIST, GET_CONTRACT_LIST_SUCCESS, GET_CONTRACT__LIST_ERROR } from './actions';
import { ChangeManagerState, ChangeManagerAction } from './types';

const initialState: ChangeManagerState = {
	commonInfoList: asyncState.initial(),
};

const changemanager = createReducer<ChangeManagerState, ChangeManagerAction>(initialState, {
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
});

export default changemanager;
