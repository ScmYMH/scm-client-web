import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserMemberList, UserMemberInfo } from 'api/userMember';
import { getUserMemberAsync, GET_USER_LIST } from './actions';

function* getUserMemberSaga(action: ReturnType<typeof getUserMemberAsync.request>) {
	try {
		const usermemberInfo: Array<UserMemberInfo> = yield call(getUserMemberList, action.payload);
		yield put(getUserMemberAsync.success(usermemberInfo));
	} catch (e: any) {
		yield put(getUserMemberAsync.failure(e));
	}
}

export function* userMemberSaga() {
	yield takeLatest(GET_USER_LIST, getUserMemberSaga);
}
