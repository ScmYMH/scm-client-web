import { all } from "@redux-saga/core/effects";
import { combineReducers } from "redux";
import {
  baseCode,
  tariffInfo,
  contractInfo,
  updateContractInfo,
  delContractInfo,
} from "./contractCoa/reducer";
import { contractInfoSaga } from "./contractCoa/saga";
import login from "./login/reducer";
import { loginSaga } from "./login/saga";
import changeManager from "./changeManager/reducer";
import { changeManagerSaga } from "./changeManager/saga";
import contractmember from "./contractMember/reducer";
import { contractMemberSaga } from "./contractMember/saga";
import usermember from "./userMember/reducer";
import { userMemberSaga } from "./userMember/saga";
import { contractCopySaga, tariffSaga } from "./tariff/saga";
import { calculateSaga } from "./calculate/saga";
import {
  calculateInfo,
  vslCdInfo,
  calculateDetailInfo,
} from "./calculate/reducer";
import { contractChangeInfoSaga } from "./contractChangeCoa/saga";
import { contractChangeInfo } from "./contractChangeCoa/reducer";
import excelImportDataInfo from "./importExcel/reducer";
import { excelImportSaga } from "./importExcel/saga";
import { contractCopyReducer, tariff } from "./tariff/reducer";
import { dashboard } from "./dashboard/reducer";
import { dashboardSaga } from "./dashboard/saga";

const rootReducer = combineReducers({
  contractInfo,
  tariffInfo,
  baseCode,
  login,
  changeManager,
  contractmember,
  usermember,
  tariff,
  contractCopyReducer,
  updateContractInfo,
  delContractInfo,
  calculateInfo,
  contractChangeInfo,
  vslCdInfo,
  calculateDetailInfo,
  excelImportDataInfo,
  dashboard,
});

// 루트 리듀서 내보내기
export default rootReducer;

// 루트 리듀서의 반환값 유추
// 컴포넌트에서 불러내서 사용해야 하므로 내보내줌
export type RootState = ReturnType<typeof rootReducer>;

// 루트 사가 만들어서 내보내주기
export function* rootSaga() {
  yield all([
    contractInfoSaga(),
    loginSaga(),
    changeManagerSaga(),
    contractMemberSaga(),
    userMemberSaga(),
    tariffSaga(),
    calculateSaga(),
    contractChangeInfoSaga(),
    excelImportSaga(),
    contractCopySaga(),
    dashboardSaga(),
  ]);
}
