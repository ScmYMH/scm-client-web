import {
  POST_EXCEL_DATA,
  POST_EXCEL_DATA_SUCCESS,
  POST_EXCEL_DATA_ERROR,
} from "./action";
import { asyncState } from "lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import { ExcelImportDataAction, ExcelImportState } from "./types";

const initialState: ExcelImportState = {
  excelImportInfo: asyncState.initial(),
};

const excelImportDataInfo = createReducer<
  ExcelImportState,
  ExcelImportDataAction
>(initialState, {
  [POST_EXCEL_DATA]: (state) => ({
    ...state,
    excelImportInfo: asyncState.load(),
  }),
  [POST_EXCEL_DATA_SUCCESS]: (state, action) => ({
    ...state,
    excelImportInfo: asyncState.success(action.payload),
  }),
  [POST_EXCEL_DATA_ERROR]: (state, action) => ({
    ...state,
    excelImportInfo: asyncState.error(action.payload),
  }),
});

export default excelImportDataInfo;
