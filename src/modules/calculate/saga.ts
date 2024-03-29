import { ACCOUNT_UPDATE_REQUEST, calculateDetailRequestAsync, calculateRequestAsync, CALCULATE_INSERT_REQUEST, CALCULATE_SELECT_REQUEST, CALCULAT_DETAIL_SELECT_REQUEST, FRTSTATUS_UPDATE_REQUEST, insertCalculateRequestAsync, updateAccountRequestAsync, updateFrtStatusRequestAsync, vslCdRequestAsync, VSLCODE_SELECT_REQUEST } from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CalculateInfo, getCalculateDetailInfo, getCalculateInfo, getVslCodeInfo, insertCalculateInfo, updateAccountInfo, updateFrtStatus, VslCdInfo } from 'api/calculateAxios';

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

function* updFrtStatusSaga(action: ReturnType<typeof updateFrtStatusRequestAsync.request>) {
	try {
		const updFrtStatus : CalculateInfo = yield call(updateFrtStatus, action.payload);
		yield put(updateFrtStatusRequestAsync.success(updFrtStatus));
	} catch (e: any) {
		yield put(updateFrtStatusRequestAsync.failure(e));
	}
}

function* updAccountSaga(action: ReturnType<typeof updateAccountRequestAsync.request>) {
	try {
		const updAccount : CalculateInfo = yield call(updateAccountInfo, action.payload);
		yield put(updateAccountRequestAsync.success(updAccount));
	} catch (e: any) {
		yield put(updateAccountRequestAsync.failure(e));
	}
}

function* insertCalculateSaga(action: ReturnType<typeof insertCalculateRequestAsync.request>) {
	try {
		const insertCalculate : CalculateInfo = yield call(insertCalculateInfo, action.payload);
		yield put(insertCalculateRequestAsync.success(insertCalculate));
	} catch (e: any) {
		yield put(insertCalculateRequestAsync.failure(e));
	}
}

export function* calculateSaga() {
	yield takeLatest(CALCULATE_SELECT_REQUEST, calculateRequestSaga);
	yield takeLatest(VSLCODE_SELECT_REQUEST, vslCdRequestSaga);
	yield takeLatest(CALCULAT_DETAIL_SELECT_REQUEST, calculateDetailRequestSaga);
	yield takeLatest(FRTSTATUS_UPDATE_REQUEST, updFrtStatusSaga);
	yield takeLatest(ACCOUNT_UPDATE_REQUEST, updAccountSaga);
	yield takeLatest(CALCULATE_INSERT_REQUEST, insertCalculateSaga);
}
