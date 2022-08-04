import { getContractInfoListApi } from "api/contractCoaAxios";
import { ContractChangeInfo } from "api/contractCoaChangeAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import { contractChangeInfoAsync, GET_COA_CHANGE_INFO } from "./action";

function* contractChangeInfoRequestSaga(
  action: ReturnType<typeof contractChangeInfoAsync.request>
) {
  try {
    const contractChangeInfo: ContractChangeInfo = yield call(
      getContractInfoListApi,
      action.payload
    );
    yield put(contractChangeInfoAsync.success(contractChangeInfo));
  } catch (e: any) {
    yield put(contractChangeInfoAsync.failure(e));
  }
}

export function* contractInfoSaga() {
  yield takeLatest(GET_COA_CHANGE_INFO, contractChangeInfoRequestSaga);
}
