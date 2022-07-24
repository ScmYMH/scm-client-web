import { CommonInfo, getContractList } from 'api/changeManagerAxios';
import { getContractListAsync, GET_CONTRACT_LIST } from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getContractListSaga(action: ReturnType<typeof getContractListAsync.request>) {
	try {
		console.log('saga 들어옴');
		console.log('saga : action.payload', action.payload);
		const commonInfo: Array<CommonInfo> = yield call(getContractList, action.payload);
		yield put(getContractListAsync.success(commonInfo));
	} catch (e: any) {
		console.log('saga error');
		yield put(getContractListAsync.failure(e));
	}
}

export function* changeManagerSaga() {
	yield takeLatest(GET_CONTRACT_LIST, getContractListSaga);
}
