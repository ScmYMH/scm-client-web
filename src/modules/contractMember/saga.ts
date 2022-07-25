import { call, put, takeLatest } from 'redux-saga/effects';
import { ContractMemberInfo, getContractMemberList } from 'api/contractMemberAxios';
import { getContractMemberAsync, GET_CONTRACT_MEMBER } from './actions';

function* getContractMemberSaga(action: ReturnType<typeof getContractMemberAsync.request>) {
	try {
		console.log('saga 들어옴');
		console.log('saga : action.payload', action.payload);
		const contractmemberInfo: Array<ContractMemberInfo> = yield call(getContractMemberList, action.payload);
		yield put(getContractMemberAsync.success(contractmemberInfo));
	} catch (e: any) {
		console.log('saga error');
		yield put(getContractMemberAsync.failure(e));
	}
}

export function* contractMemberSaga() {
	yield takeLatest(GET_CONTRACT_MEMBER, getContractMemberSaga);
}
