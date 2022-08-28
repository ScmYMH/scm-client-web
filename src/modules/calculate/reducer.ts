import { createReducer } from 'typesafe-actions';
import { asyncState } from '../../lib/reducerUtils';
import { 	
	CALCULATE_SELECT_REQUEST,
	CALCULATE_SELECT_SUCCESS,
	CALCULATE_SELECT_ERROR } from './actions';
import { CalculateInfoAction, CalculateInfoState } from './types';

const initialState: CalculateInfoState = {
	calculateInfo: asyncState.initial(),
};

const calculateInfo = createReducer<CalculateInfoState, CalculateInfoAction>(initialState, {
	[CALCULATE_SELECT_REQUEST]: (state) => ({
		...state,
		calculateInfo: asyncState.load(),
	}),
	[CALCULATE_SELECT_SUCCESS]: (state, action) => ({
		...state,
		calculateInfo: asyncState.success(action.payload),
	}),
	[CALCULATE_SELECT_ERROR]: (state, action) => ({
		...state,
		calculateInfo: asyncState.error(action.payload),
	}),
});

export default calculateInfo;
