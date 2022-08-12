import {
  getDestInfo,
  getLccInfo,
  getTariffHeaderCond,
  postTariffInfo,
} from "api/tariffAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getDestInfoAsync,
  getLccInfoAsync,
  getTariffHeaderCondAsync,
  GET_DEST_INFO,
  GET_LCC_INFO,
  GET_TARIFF_HEADER_COND,
  postTariffInfoAsync,
  POST_TARIFF_INFO,
} from "./actions";
import { DestInfo, LccInfo, TariffHeaderCond, TariffInfo } from "./types";

function* getTariffHeaderCondSaga(
  action: ReturnType<typeof getTariffHeaderCondAsync.request>
) {
  try {
    console.log("getTariffHeaderCondSaga");
    const tariffHeaderCond: TariffHeaderCond = yield call(getTariffHeaderCond);
    yield put(getTariffHeaderCondAsync.success(tariffHeaderCond));
  } catch (e: any) {
    console.log("getTariffHeaderCondSaga error");
    yield put(getTariffHeaderCondAsync.failure(e));
  }
}

function* postTariffInfoSaga(
  action: ReturnType<typeof postTariffInfoAsync.request>
) {
  try {
    console.log("postTariffInfoSaga ----- action.payload : ", action.payload);
    const tariffInfo: TariffInfo = yield call(postTariffInfo, action.payload);
    yield put(postTariffInfoAsync.success(tariffInfo));
    alert("저장되었습니다");
  } catch (e: any) {
    console.log("postTariffInfoSaga error");
    yield put(postTariffInfoAsync.failure(e));
  }
}

function* getDestInfoSaga(action: ReturnType<typeof getDestInfoAsync.request>) {
  try {
    const destInfoList: Array<DestInfo> = yield call(getDestInfo);
    yield put(getDestInfoAsync.success(destInfoList));
  } catch (e: any) {
    console.log("getDestInfoSaga error");
    yield put(getDestInfoAsync.failure(e));
  }
}

function* getLccInfoSaga(action: ReturnType<typeof getLccInfoAsync.request>) {
  try {
    console.log("getLccInfoSaga ---- action.payload: ", action.payload);
    const lccInfoList: Array<LccInfo> = yield call(getLccInfo, action.payload);
    yield put(getLccInfoAsync.success(lccInfoList));
  } catch (e: any) {
    console.log("getLccInfoSaga error");
    yield put(getLccInfoAsync.failure(e));
  }
}

export function* tariffSaga() {
  yield takeLatest(GET_TARIFF_HEADER_COND, getTariffHeaderCondSaga);
  yield takeLatest(POST_TARIFF_INFO, postTariffInfoSaga);
  yield takeLatest(GET_DEST_INFO, getDestInfoSaga);
  yield takeLatest(GET_LCC_INFO, getLccInfoSaga);
}
