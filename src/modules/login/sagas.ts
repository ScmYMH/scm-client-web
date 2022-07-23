import { getUserProfileAsync, LOGIN_REQUEST} from './actions';
import { call, put, takeLatest } from "redux-saga/effects";
import { loginApi } from './api';
import { GetCheckSessionResponseType } from './types';

function* loginUser(action: ReturnType<typeof getUserProfileAsync.request>) {
  console.log("loginUser");
  try {
    //해당 액션의 payload 값을 인자로 넣어줄 수 있습니다.
    const response: GetCheckSessionResponseType = yield call(
      loginApi,
      action.payload
    );
    //actions.ts에서 선언한 비동기 처리를 위한 액션 생성함수를 각 특성에 맞게 디스패칭 합니다.
    //당연히 디스패치를 할 때 넣어줄 인자는 actions.ts에서 정의한 성공, 실패에 대한 타입이 일치해야 합니다.
    yield put(getCheckSessionAsync.success(response));
  } catch (error) {
    yield put(getCheckSessionAsync.failure(error));
  }
}

//사가함수
export function* LoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginUser);
}