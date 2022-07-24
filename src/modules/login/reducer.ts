import { createReducer } from 'typesafe-actions';
import { asyncState } from '../../lib/reducerUtils';
import { LOGIN_REQUEST, LOGIN_REQUEST_ERROR, LOGIN_REQUEST_SUCCESS } from './actions';
import { LoginAction, LoginState } from './types';

const initialState: LoginState = {
	loginInfo: asyncState.initial(),
};

const login = createReducer<LoginState, LoginAction>(initialState, {
	[LOGIN_REQUEST]: (state) => ({
		...state,
		loginInfo: asyncState.load(),
	}),
	[LOGIN_REQUEST_SUCCESS]: (state, action) => ({
		...state,
		loginInfo: asyncState.success(action.payload),
	}),
	[LOGIN_REQUEST_ERROR]: (state, action) => ({
		...state,
		loginInfo: asyncState.error(action.payload),
	}),
});

export default login;
