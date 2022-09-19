import { asyncState } from 'lib/reducerUtils';
import { createReducer } from 'typesafe-actions';
import { GET_USER_LIST, GET_USER_LIST_ERROR, GET_USER_LIST_SUCCESS } from './actions';
import { UserMemberAction, UserMemberState } from './types';
import { GET_CONTRACT_LIST, GET_CONTRACT__LIST_ERROR } from './../changeManager/actions';

const initialState: UserMemberState = {
	userMemberList: asyncState.initial(),
};

const usermember = createReducer<UserMemberState, UserMemberAction>(initialState, {
	[GET_USER_LIST]: (state) => ({
		...state,
		userMemberList: asyncState.load(),
	}),
	[GET_USER_LIST_SUCCESS]: (state, action) => ({
		...state,
		userMemberList: asyncState.success(action.payload),
	}),
	[GET_USER_LIST_ERROR]: (state, action) => ({
		...state,
		userMemberList: asyncState.error(action.payload),
	}),
});

export default usermember;
