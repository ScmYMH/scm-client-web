import {
  ContractInfo,
  getContractInfoListApi,
  getTariffInfoListApi,
  TariffInfo,
} from "api/contractCoaAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  contractInfoAsync,
  GET_CONTRACT_INFO_REQUEST,
  GET_TARIFF_INFO_REQUEST,
  tariffInfoAsync,
} from "./action";

function* contractInfoRequestSaga(
  action: ReturnType<typeof contractInfoAsync.request>
) {
  try {
    const contractInfo: ContractInfo = yield call(
      getContractInfoListApi,
      action.payload
    );
    yield put(contractInfoAsync.success(contractInfo));
  } catch (e: any) {
    yield put(contractInfoAsync.failure(e));
  }
}

function* tariffInfoRequestSaga(
  action: ReturnType<typeof tariffInfoAsync.request>
) {
  try {
    const tariffInfo: TariffInfo = yield call(
      getTariffInfoListApi,
      action.payload
    );
    yield put(tariffInfoAsync.success(tariffInfo));
  } catch (e: any) {
    yield put(tariffInfoAsync.failure(e));
  }
}

export function* contractInfoSaga() {
  yield takeLatest(GET_CONTRACT_INFO_REQUEST, contractInfoRequestSaga);
  yield takeLatest(GET_TARIFF_INFO_REQUEST, tariffInfoRequestSaga);
}
