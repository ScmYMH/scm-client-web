import { CalculateInfo } from 'api/calculateAxios';
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
