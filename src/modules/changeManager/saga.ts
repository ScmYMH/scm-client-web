import { delCntrtChgInfo, getContractList, postCntrtChgInfo, putCntrtChgInfo } from 'api/changeManagerAxios';
import {
	delCntrtChgInfoAsync,
	DELETE_CNTRT_CHG_INFO,
	getContractListAsync,
	GET_CONTRACT_LIST,
	postCntrtChgInfoAsync,
	POST_CNTRT_CHG_INFO,
	putCntrtChgInfoAsync,
	PUT_CNTRT_CHG_INFO,
} from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CntrtChangeInfo, CommonInfo } from './types';

function* getContractListSaga(action: ReturnType<typeof getContractListAsync.request>) {
	try {
		console.log('getContractListSaga : action.payload', action.payload);
		const commonInfo: Array<CommonInfo> = yield call(getContractList, action.payload);
		yield put(getContractListAsync.success(commonInfo));
	} catch (e: any) {
		console.log('saga error');
		yield put(getContractListAsync.failure(e));
	}
}

function* postCntrtChgInfoSaga(action: ReturnType<typeof postCntrtChgInfoAsync.request>) {
	try {
		console.log('postCntrtChgInfoSaga : action.payload', action.payload);
		const cntrtChangeInfo: Array<CntrtChangeInfo> = yield call(postCntrtChgInfo, action.payload);
		yield put(postCntrtChgInfoAsync.success(cntrtChangeInfo));
	} catch (e: any) {
		console.log('postCntrtChgInfoSaga error');
		yield put(postCntrtChgInfoAsync.failure(e));
	}
}

function* putCntrtChgInfoSaga(action: ReturnType<typeof putCntrtChgInfoAsync.request>) {
	try {
		console.log('putCntrtChgInfoSaga : action.payload', action.payload);
		const cntrtConfirmResult: boolean = yield call(putCntrtChgInfo, action.payload);
		yield put(putCntrtChgInfoAsync.success(cntrtConfirmResult));
	} catch (e: any) {
		console.log('putCntrtChgInfoSaga error');
		yield put(putCntrtChgInfoAsync.failure(e));
	}
}

function* delCntrtChgInfoSaga(action: ReturnType<typeof delCntrtChgInfoAsync.request>) {
	try {
		console.log('delCntrtChgInfoSaga : action.payload', action.payload);
		const cntrtCancelResult: boolean = yield call(delCntrtChgInfo, action.payload);
		yield put(delCntrtChgInfoAsync.success(cntrtCancelResult));
	} catch (e: any) {
		console.log('delCntrtChgInfoSaga error');
		yield put(delCntrtChgInfoAsync.failure(e));
	}
}

export function* changeManagerSaga() {
	yield takeLatest(GET_CONTRACT_LIST, getContractListSaga);
	yield takeLatest(POST_CNTRT_CHG_INFO, postCntrtChgInfoSaga);
	yield takeLatest(PUT_CNTRT_CHG_INFO, putCntrtChgInfoSaga);
	yield takeLatest(DELETE_CNTRT_CHG_INFO, delCntrtChgInfoSaga);
}
