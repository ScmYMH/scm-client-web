import { ExcelImportData, postExcelImport } from "api/excelImportAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  postTariffExcelImportAsync,
  POST_EXCEL_DATA,
  putValCheckAsync,
  PUT_VAL_CHECK,
} from "./action";
function* excelImportRequestSaga(
  action: ReturnType<typeof postTariffExcelImportAsync.request>
) {
  try {
    const excelImportDataInfo: number = yield call(
      postExcelImport,
      action.payload
    );
    yield put(postTariffExcelImportAsync.success(excelImportDataInfo));
  } catch (e: any) {
    yield put(postTariffExcelImportAsync.failure(e));
  }
}

function* putValCheckSaga(action: ReturnType<typeof putValCheckAsync.request>) {
  try {
    yield put(putValCheckAsync.success(action.payload));
  } catch (e: any) {
    yield put(putValCheckAsync.failure(e));
  }
}

export function* excelImportSaga() {
  yield takeLatest(POST_EXCEL_DATA, excelImportRequestSaga);
  yield takeLatest(PUT_VAL_CHECK, putValCheckSaga);
}
