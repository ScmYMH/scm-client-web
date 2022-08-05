import { all } from "@redux-saga/core/effects";
import { combineReducers } from "redux";
import { tariffInfo, contractInfo } from "./contractCoa/reducer";
import { contractInfoSaga } from "./contractCoa/saga";
import { contractChangeInfoSaga } from "./contractChangeCoa/saga";
import { contractChangeInfo } from "./contractChangeCoa/reducer";

const rootReducer = combineReducers({
  contractInfo,
  tariffInfo,
  contractChangeInfo,
});

// 루트 리듀서 내보내기
export default rootReducer;

// 루트 리듀서의 반환값 유추
// 컴포넌트에서 불러내서 사용해야 하므로 내보내줌
export type RootState = ReturnType<typeof rootReducer>;

// 루트 사가 만들어서 내보내주기
export function* rootSaga() {
  yield all([contractInfoSaga(), contractChangeInfoSaga()]);
}
