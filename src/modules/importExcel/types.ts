import * as actions from "./action";
import { ActionType } from "typesafe-actions";
import { AsyncState } from "../../lib/reducerUtils";
import { ExcelImportData } from "api/excelImportAxios";

export type ExcelImportDataAction = ActionType<typeof actions>;

export type ExcelImportState = {
  excelImportInfo: AsyncState<number, Error>;
};
