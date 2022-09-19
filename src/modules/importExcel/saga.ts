import { ExcelImportData, postExcelImport } from "api/excelImportAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import { postTariffExcelImportAsync, POST_EXCEL_DATA } from "./action";
function* excelImportRequestSaga(
  action: ReturnType<typeof postTariffExcelImportAsync.request>
) {
  try {
    const excelImportDataInfo: Array<ExcelImportData> = yield call(
      postExcelImport,
      action.payload
    );
    yield put(postTariffExcelImportAsync.success(excelImportDataInfo));
  } catch (e: any) {
    yield put(postTariffExcelImportAsync.failure(e));
  }
}

export function* excelImportSaga() {
  yield takeLatest(POST_EXCEL_DATA, excelImportRequestSaga);
}
