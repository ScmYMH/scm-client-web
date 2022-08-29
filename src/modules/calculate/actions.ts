import { CalculateInfo, VslCdInfo } from 'api/calculateAxios';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

// 액션 정의
export const CALCULATE_SELECT_REQUEST = 'calculate/CALCULATE_SELECT_REQUEST';
export const CALCULATE_SELECT_SUCCESS = 'calculate/CALCULATE_SELECT_SUCCESS';
export const CALCULATE_SELECT_ERROR = 'calculate/CALCULATE_SELECT_ERROR';

export const calculateRequestAsync = createAsyncAction(
	CALCULATE_SELECT_REQUEST,
	CALCULATE_SELECT_SUCCESS,
	CALCULATE_SELECT_ERROR,
)<any, CalculateInfo, AxiosError>();

// 액션 정의
export const CALCULAT_DETAIL_SELECT_REQUEST = 'calculate/CALCULAT_DETAIL_SELECT_REQUEST';
export const CALCULAT_DETAIL_SELECT_SUCCESS = 'calculate/CALCULAT_DETAIL_SELECT_SUCCESS';
export const CALCULAT_DETAIL_SELECT_ERROR = 'calculate/CALCULAT_DETAIL_SELECT_ERROR';

export const calculateDetailRequestAsync = createAsyncAction(
	CALCULAT_DETAIL_SELECT_REQUEST,
	CALCULAT_DETAIL_SELECT_SUCCESS,
	CALCULAT_DETAIL_SELECT_ERROR,
)<any, CalculateInfo, AxiosError>();

// vsl code 액션 정의
export const VSLCODE_SELECT_REQUEST = 'calculate/VSLCODE_SELECT_REQUEST';
export const VSLCODE_SELECT_SUCCESS = 'calculate/VSLCODE_SELECT_SUCCESS';
export const VSLCODE_SELECT_ERROR = 'calculate/VSLCODE_SELECT_ERROR';

export const vslCdRequestAsync = createAsyncAction(
	VSLCODE_SELECT_REQUEST,
	VSLCODE_SELECT_SUCCESS,
	VSLCODE_SELECT_ERROR,
)<any, VslCdInfo, AxiosError>();
