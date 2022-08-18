import {
  getCodeDefAxios,
  getDestInfoAxios,
  getLccInfoAxios,
  getTariffCondHAxios,
  postTariffHeaderAxios,
} from "api/tariffAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCodeDefAsync,
  getDestInfoAsync,
  getLccInfoAsync,
  getTariffCondHAsync,
  GET_CODE_DEFINITION,
  GET_DEST_INFO,
  GET_LCC_INFO,
  GET_TARIFF_COND_H,
  postTariffHeaderAsync,
  POST_TARIFF_HEADER,
} from "./actions";
import {
  CodeDefinition,
  DestInfo,
  LccInfo,
  TariffCondH,
  TariffHeader,
} from "./types";

function* postTariffHeaderSaga(
  action: ReturnType<typeof postTariffHeaderAsync.request>
) {
  try {
    const tariffInfo: TariffHeader = yield call(
      postTariffHeaderAxios,
      action.payload
    );
    yield put(postTariffHeaderAsync.success(tariffInfo));
    alert("저장되었습니다");
  } catch (e: any) {
    console.log("postTariffInfoSaga error");
    yield put(postTariffHeaderAsync.failure(e));
  }
}

function* getTariffCondHSaga(
  action: ReturnType<typeof getTariffCondHAsync.request>
) {
  try {
    const tariffCondHList: Array<TariffCondH> = yield call(
      getTariffCondHAxios,
      action.payload
    );
    yield put(getTariffCondHAsync.success(tariffCondHList));
  } catch (e: any) {
    console.log("getTariffCondHSaga error");
    yield put(getTariffCondHAsync.failure(e));
  }
}

function* getDestInfoSaga(action: ReturnType<typeof getDestInfoAsync.request>) {
  try {
    const destInfoList: Array<DestInfo> = yield call(getDestInfoAxios);
    yield put(getDestInfoAsync.success(destInfoList));
  } catch (e: any) {
    console.log("getDestInfoSaga error");
    yield put(getDestInfoAsync.failure(e));
  }
}

function* getLccInfoSaga(action: ReturnType<typeof getLccInfoAsync.request>) {
  try {
    const lccInfoList: Array<LccInfo> = yield call(
      getLccInfoAxios,
      action.payload
    );
    yield put(getLccInfoAsync.success(lccInfoList));
  } catch (e: any) {
    console.log("getLccInfoSaga error");
    yield put(getLccInfoAsync.failure(e));
  }
}

function* getCodeDefSaga(action: ReturnType<typeof getCodeDefAsync.request>) {
  try {
    const codeDef: Array<CodeDefinition> = yield call(
      getCodeDefAxios,
      action.payload
    );
    yield put(getCodeDefAsync.success(codeDef));
  } catch (e: any) {
    yield put(getCodeDefAsync.failure(e));
  }
}

export function* tariffSaga() {
  yield takeLatest(POST_TARIFF_HEADER, postTariffHeaderSaga);
  yield takeLatest(GET_TARIFF_COND_H, getTariffCondHSaga);
  yield takeLatest(GET_DEST_INFO, getDestInfoSaga);
  yield takeLatest(GET_LCC_INFO, getLccInfoSaga);
  yield takeLatest(GET_CODE_DEFINITION, getCodeDefSaga);
}
