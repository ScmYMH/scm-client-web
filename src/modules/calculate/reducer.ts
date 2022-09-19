import { createReducer } from 'typesafe-actions';
import { asyncState } from '../../lib/reducerUtils';
import { 	
	CALCULATE_SELECT_REQUEST,
	CALCULATE_SELECT_SUCCESS,
	CALCULATE_SELECT_ERROR, 
	VSLCODE_SELECT_REQUEST,
	VSLCODE_SELECT_ERROR,
	VSLCODE_SELECT_SUCCESS,
	CALCULAT_DETAIL_SELECT_REQUEST,
	CALCULAT_DETAIL_SELECT_SUCCESS,
	CALCULAT_DETAIL_SELECT_ERROR,
	FRTSTATUS_UPDATE_ERROR,
	FRTSTATUS_UPDATE_SUCCESS,
	FRTSTATUS_UPDATE_REQUEST,
	ACCOUNT_UPDATE_ERROR,
	ACCOUNT_UPDATE_SUCCESS,
	ACCOUNT_UPDATE_REQUEST,
	CALCULATE_INSERT_REQUEST,
	CALCULATE_INSERT_SUCCESS,
	CALCULATE_INSERT_ERROR} from './actions';
import { CalculateDetailInfoAction, CalculateDetailInfoState, CalculateInfoAction, CalculateInfoState, InsertCalculateInfoAction, InsertCalculateInfoState, UpdateAccountAction, UpdateAccountState, UpdateFrtStatusAction, UpdateFrtStatusState, VslCdAction, VslCdState } from './types';

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

const insertCalInitialState: InsertCalculateInfoState = {
	insertCalculateInfo: asyncState.initial(),
};

const insertCalculateInfo = createReducer<InsertCalculateInfoState, InsertCalculateInfoAction>(insertCalInitialState, {
	[CALCULATE_INSERT_REQUEST]: (state) => ({
		...state,
		insertCalculateInfo: asyncState.load(),
	}),
	[CALCULATE_INSERT_SUCCESS]: (state, action) => ({
		...state,
		insertCalculateInfo: asyncState.success(action.payload),
	}),
	[CALCULATE_INSERT_ERROR]: (state, action) => ({
		...state,
		insertCalculateInfo: asyncState.error(action.payload),
	}),
});

const calDetailInfoInitialState: CalculateDetailInfoState = {
	calculateDetailInfo: asyncState.initial(),
};

const calculateDetailInfo = createReducer<CalculateDetailInfoState, CalculateDetailInfoAction>(calDetailInfoInitialState, {
	[CALCULAT_DETAIL_SELECT_REQUEST]: (state) => ({
		...state,
		calculateDetailInfo: asyncState.load(),
	}),
	[CALCULAT_DETAIL_SELECT_SUCCESS]: (state, action) => ({
		...state,
		calculateDetailInfo: asyncState.success(action.payload),
	}),
	[CALCULAT_DETAIL_SELECT_ERROR]: (state, action) => ({
		...state,
		calculateDetailInfo: asyncState.error(action.payload),
	}),
});


const updateFrtStatusInitialState: UpdateFrtStatusState = {
	updateFrtStatus: asyncState.initial(),
};

const updateFrtStatus = createReducer<UpdateFrtStatusState, UpdateFrtStatusAction>(updateFrtStatusInitialState, {
	[FRTSTATUS_UPDATE_REQUEST]: (state) => ({
		...state,
		updateFrtStatus: asyncState.load(),
	}),
	[FRTSTATUS_UPDATE_SUCCESS]: (state, action) => ({
		...state,
		updateFrtStatus: asyncState.success(action.payload),
	}),
	[FRTSTATUS_UPDATE_ERROR]: (state, action) => ({
		...state,
		updateFrtStatus: asyncState.error(action.payload),
	}),
});

const accountInitialState: UpdateAccountState = {
	updAccountInfo: asyncState.initial(),
};

const updAccountInfo = createReducer<UpdateAccountState, UpdateAccountAction>(accountInitialState, {
	[ACCOUNT_UPDATE_REQUEST]: (state) => ({
		...state,
		updAccountInfo: asyncState.load(),
	}),
	[ACCOUNT_UPDATE_SUCCESS]: (state, action) => ({
		...state,
		updAccountInfo: asyncState.success(action.payload),
	}),
	[ACCOUNT_UPDATE_ERROR]: (state, action) => ({
		...state,
		updAccountInfo: asyncState.error(action.payload),
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


export {insertCalculateInfo, calculateInfo, vslCdInfo, calculateDetailInfo, updAccountInfo, updateFrtStatus};
