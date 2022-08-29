import { calculateDetailRequestAsync, calculateRequestAsync, CALCULATE_SELECT_REQUEST, CALCULAT_DETAIL_SELECT_REQUEST, vslCdRequestAsync, VSLCODE_SELECT_REQUEST } from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CalculateInfo, getCalculateDetailInfo, getCalculateInfo, getVslCodeInfo, VslCdInfo } from 'api/calculateAxios';

function* calculateRequestSaga(action: ReturnType<typeof calculateRequestAsync.request>) {
	try {
		const calculateInfo : CalculateInfo = yield call(getCalculateInfo, action.payload);
		yield put(calculateRequestAsync.success(calculateInfo));
	} catch (e: any) {
		yield put(calculateRequestAsync.failure(e));
	}
}

function* calculateDetailRequestSaga(action: ReturnType<typeof calculateRequestAsync.request>) {
	try {
		const calDetailInfo : CalculateInfo = yield call(getCalculateDetailInfo, action.payload);
		yield put(calculateDetailRequestAsync.success(calDetailInfo));
	} catch (e: any) {
		yield put(calculateDetailRequestAsync.failure(e));
	}
}

function* vslCdRequestSaga(action: ReturnType<typeof vslCdRequestAsync.request>) {
	try {
		const vslCdInfo : VslCdInfo = yield call(getVslCodeInfo, action.payload);
		yield put(vslCdRequestAsync.success(vslCdInfo));
	} catch (e: any) {
		yield put(vslCdRequestAsync.failure(e));
	}
}

export function* calculateSaga() {
	yield takeLatest(CALCULATE_SELECT_REQUEST, calculateRequestSaga);
	yield takeLatest(VSLCODE_SELECT_REQUEST, vslCdRequestSaga);
	yield takeLatest(CALCULAT_DETAIL_SELECT_REQUEST, calculateDetailRequestSaga);

}
