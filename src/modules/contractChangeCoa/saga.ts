import { contractChangeInfoAsync, GET_COA_CHANGE_INFO } from "./action";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  ContractChangeInfo,
  getContractChangeInfoListApi,
} from "api/contractCoaChangeAxios";

function* ContractChangeInfoRequestSaga(
  action: ReturnType<typeof contractChangeInfoAsync.request>
) {
  try {
    const contractChangeInfo: ContractChangeInfo = yield call(
      getContractChangeInfoListApi,
      action.payload
    );
    yield put(contractChangeInfoAsync.success(contractChangeInfo));
  } catch (e: any) {
    yield put(contractChangeInfoAsync.failure(e));
  }
}

export function* contractChangeInfoSaga() {
  yield takeLatest(GET_COA_CHANGE_INFO, ContractChangeInfoRequestSaga);
}
