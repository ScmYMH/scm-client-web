import { getDashboardCalculateInfoAxios } from "api/dashboardAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import { getCalculateInfoAsync, GET_CALCULATE_INFO } from "./actions";
import { DashboardCalculateInfo } from "./types";

function* getCalculateInfoSaga(
  action: ReturnType<typeof getCalculateInfoAsync.request>
) {
  try {
    const dashboardCalculateInfo: DashboardCalculateInfo[] = yield call(
      getDashboardCalculateInfoAxios
    );
    console.log("dashboardCalculateInfo : ", dashboardCalculateInfo);
    yield put(getCalculateInfoAsync.success(dashboardCalculateInfo));
  } catch (e: any) {
    console.log("getCalculateInfoSaga error");
    yield put(getCalculateInfoAsync.failure(e));
  }
}

export function* dashboardSaga() {
  yield takeLatest(GET_CALCULATE_INFO, getCalculateInfoSaga);
}
