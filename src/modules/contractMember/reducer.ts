import { asyncState } from 'lib/reducerUtils';
import { createReducer } from 'typesafe-actions';
import { ContractMemberAction, ContractMemberState } from './types';
import {
	GET_CONTRACT_MEMBER,
	GET_CONTRACT_MEMBER_SUCCESS,
	GET_CONTRACT_MEMBER_ERROR,
	POST_USER_LIST,
	POST_USER_LIST_ERROR,
	POST_USER_LIST_SUCCESS,
	DELETE_CONTRACT_MEMBER,
	DELETE_CONTRACT_MEMBER_SUCCESS,
	DELETE_CONTRACT_MEMBER_ERROR,
} from './actions';

const initialState: ContractMemberState = {
	contractMemberList: asyncState.initial(),
	contractMemberPostList: asyncState.initial(),
	contractMemberDelete: asyncState.initial(),
};

const contractmember = createReducer<ContractMemberState, ContractMemberAction>(initialState, {
	[GET_CONTRACT_MEMBER]: (state) => ({
		...state,
		contractMemberList: asyncState.load(),
	}),
	[GET_CONTRACT_MEMBER_SUCCESS]: (state, action) => ({
		...state,
		contractMemberList: asyncState.success(action.payload),
	}),
	[GET_CONTRACT_MEMBER_ERROR]: (state, action) => ({
		...state,
		contractMemberList: asyncState.error(action.payload),
	}),
	[POST_USER_LIST]: (state) => ({
		...state,
		contractMemberPostList: asyncState.load(),
	}),
	[POST_USER_LIST_SUCCESS]: (state, action) => ({
		...state,
		contractMemberPostList: asyncState.success(action.payload),
	}),
	[POST_USER_LIST_ERROR]: (state, action) => ({
		...state,
		contractMemberPostList: asyncState.error(action.payload),
	}),
	[DELETE_CONTRACT_MEMBER]: (state) => ({
		...state,
		contractMemberDelete: asyncState.load(),
	}),
	[DELETE_CONTRACT_MEMBER_SUCCESS]: (state, action) => ({
		...state,
		contractMemberDelete: asyncState.success(action.payload),
	}),
	[DELETE_CONTRACT_MEMBER_ERROR]: (state, action) => ({
		...state,
		contractMemberDelete: asyncState.error(action.payload),
	}),
});

export default contractmember;
