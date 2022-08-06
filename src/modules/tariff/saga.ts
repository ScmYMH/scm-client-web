import { getTariffHeaderCond } from "api/tariffAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import { getTariffHeaderCondAsync, GET_TARIFF_HEADER_COND } from "./actions";
import { TariffHeaderCond } from "./types";

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

export function* tariffSaga() {
  yield takeLatest(GET_TARIFF_HEADER_COND, getTariffHeaderCondSaga);
}
