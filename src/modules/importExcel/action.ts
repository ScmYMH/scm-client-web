import { createAsyncAction } from "typesafe-actions";
import { AxiosError } from "axios";
import { ExcelImportData, ValidationCheckData } from "api/excelImportAxios";

export const POST_EXCEL_DATA = "importExcel/POST_EXCEL_DATA";
export const POST_EXCEL_DATA_SUCCESS = "importExcel/POST_EXCEL_DATA_SUCCESS";
export const POST_EXCEL_DATA_ERROR = "importExcel/POST_EXCEL_DATA_ERROR";

export const GET_VAL_CEHCK = "importExcel/GET_VAL_CEHCK";
export const GET_VAL_CEHCK_SUCCESS = "importExcel/GET_VAL_CEHCK_SUCCESS";
export const GET_VAL_CEHCK_ERROR = "importExcel/GET_VAL_CEHCK_ERROR";

export const PUT_VAL_CHECK = "importExcel/PUT_VAL_CHECK";
export const PUT_VAL_CHECK_SUCCESS = "importExcel/PUT_VAL_CHECK_SUCCESS";
export const PUT_VAL_CHECK_ERROR = "importExcel/PUT_VAL_CHECK_ERROR";

export const postTariffExcelImportAsync = createAsyncAction(
  POST_EXCEL_DATA,
  POST_EXCEL_DATA_SUCCESS,
  POST_EXCEL_DATA_ERROR
)<any, number, AxiosError>();

export const getExcelValidationAsync = createAsyncAction(
  GET_VAL_CEHCK,
  GET_VAL_CEHCK_SUCCESS,
  GET_VAL_CEHCK_ERROR
)<any, Array<ValidationCheckData>, AxiosError>();

export const putValCheckAsync = createAsyncAction(
  PUT_VAL_CHECK,
  PUT_VAL_CHECK_SUCCESS,
  PUT_VAL_CHECK_ERROR
)<number, number, AxiosError>();
