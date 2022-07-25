import { loginRequestAsync, LOGIN_REQUEST } from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginApi, LoginInfo} from '../../api/loginApi';

function* loginRequestSaga(action: ReturnType<typeof loginRequestAsync.request>) {
	try {
		const loginInfo : LoginInfo = yield call(loginApi, action.payload);
		yield put(loginRequestAsync.success(loginInfo));
	} catch (e: any) {
		yield put(loginRequestAsync.failure(e));
	}
}

export function* loginSaga() {
	yield takeLatest(LOGIN_REQUEST, loginRequestSaga);
}
