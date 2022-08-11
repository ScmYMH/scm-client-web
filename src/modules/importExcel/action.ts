import { ExcelImportData } from "api/excelImportAxios";
import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";

export const POST_EXCEL_DATA = "importExcel/POST_EXCEL_DATA";
export const POST_EXCEL_DATA_SUCCESS = "importExcel/POST_EXCEL_DATA_SUCCESS";
export const POST_EXCEL_DATA_ERROR = "importExcel/POST_EXCEL_DATA_ERROR";

export const postTariffExcelImportAsync = createAsyncAction(
  POST_EXCEL_DATA,
  POST_EXCEL_DATA_SUCCESS,
  POST_EXCEL_DATA_ERROR
)<any, Array<ExcelImportData>, AxiosError>();
