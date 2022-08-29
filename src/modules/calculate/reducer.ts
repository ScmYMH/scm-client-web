import { createReducer } from 'typesafe-actions';
import { asyncState } from '../../lib/reducerUtils';
import { 	
	CALCULATE_SELECT_REQUEST,
	CALCULATE_SELECT_SUCCESS,
	CALCULATE_SELECT_ERROR, 
	VSLCODE_SELECT_REQUEST,
	VSLCODE_SELECT_ERROR,
	VSLCODE_SELECT_SUCCESS} from './actions';
import { CalculateInfoAction, CalculateInfoState, VslCdAction, VslCdState } from './types';

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


const vslInitialState: VslCdState = {
	vslCdInfo: asyncState.initial(),
};

const vslCdInfo = createReducer<VslCdState, VslCdAction>(vslInitialState, {
	[VSLCODE_SELECT_REQUEST]: (state) => ({
		...state,
		vslCdInfo: asyncState.load(),
	}),
	[VSLCODE_SELECT_SUCCESS]: (state, action) => ({
		...state,
		vslCdInfo: asyncState.success(action.payload),
	}),
	[VSLCODE_SELECT_ERROR]: (state, action) => ({
		...state,
		vslCdInfo: asyncState.error(action.payload),
	}),
});


export {calculateInfo, vslCdInfo};
