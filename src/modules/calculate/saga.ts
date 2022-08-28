import { calculateRequestAsync, CALCULATE_SELECT_REQUEST } from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CalculateInfo, getCalculateInfo } from 'api/calculateAxios';

function* calculateRequestSaga(action: ReturnType<typeof calculateRequestAsync.request>) {
	try {
		const calculateInfo : CalculateInfo = yield call(getCalculateInfo, action.payload);
		yield put(calculateRequestAsync.success(calculateInfo));
	} catch (e: any) {
		yield put(calculateRequestAsync.failure(e));
	}
}

export function* calculateSaga() {
	yield takeLatest(CALCULATE_SELECT_REQUEST, calculateRequestSaga);
}
