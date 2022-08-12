import {
  ContractInfo,
  ContractInfoDefinition,
  getContractInfoDefinitionApi,
  getContractInfoListApi,
  getTariffInfoListApi,
  insertContractInfo,
  TariffInfo,
  updateContractInfo,
} from "api/contractCoaAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  baseCodeAsync,
  contractInfoAsync,
  GET_BASECODE_INFO_REQUEST,
  GET_CONTRACT_INFO_REQUEST,
  GET_TARIFF_INFO_REQUEST,
  POST_CONTRACT_INFO_REQUEST,
  POST_CONTRACT_INFO_REQUEST_SUCCESS,
  POST_CONTRACT_INFO_REQUEST_ERROR,
  tariffInfoAsync,
  insertContractCodeAsync,
  UPDATE_CONTRACT_INFO_REQUEST,
  updateContractCodeAsync,
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

function* insertContractInfoRequestSaga(
  action: ReturnType<typeof insertContractCodeAsync.request>
) {
  try {
    const postContractInfo: ContractInfo = yield call(
      insertContractInfo,
      action.payload
    );
    yield put(insertContractCodeAsync.success(postContractInfo));
  } catch (e: any) {
    yield put(insertContractCodeAsync.failure(e));
  }
}

function* updateContractInfoRequestSaga(
  action: ReturnType<typeof updateContractCodeAsync.request>
) {
  try {
    const updContractInfo: ContractInfo = yield call(
      updateContractInfo,
      action.payload
    );
    yield put(updateContractCodeAsync.success(updContractInfo));
  } catch (e: any) {
    yield put(updateContractCodeAsync.failure(e));
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

function* baseCodeSaga(action: ReturnType<typeof baseCodeAsync.request>) {
  try {
    const baseCode: ContractInfoDefinition = yield call(
      getContractInfoDefinitionApi,
      action.payload
    );
    yield put(baseCodeAsync.success(baseCode));
  } catch (e: any) {
    yield put(baseCodeAsync.failure(e));
  }
}

export function* contractInfoSaga() {
  yield takeLatest(GET_CONTRACT_INFO_REQUEST, contractInfoRequestSaga);
  yield takeLatest(GET_TARIFF_INFO_REQUEST, tariffInfoRequestSaga);
  yield takeLatest(GET_BASECODE_INFO_REQUEST, baseCodeSaga);
  yield takeLatest(POST_CONTRACT_INFO_REQUEST, insertContractInfoRequestSaga);
  yield takeLatest(UPDATE_CONTRACT_INFO_REQUEST, updateContractInfoRequestSaga);
}
