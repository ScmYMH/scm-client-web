import { asyncState } from 'lib/reducerUtils';
import { createReducer } from 'typesafe-actions';
import { ContractMemberAction, ContractMemberState } from './types';
import { GET_CONTRACT_MEMBER, GET_CONTRACT_MEMBER_SUCCESS, GET_CONTRACT_MEMBER_ERROR } from './actions';

const initialState: ContractMemberState = {
	contractMemberList: asyncState.initial(),
};

const changemanager = createReducer<ContractMemberState, ContractMemberAction>(initialState, {
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
});

export default changemanager;
