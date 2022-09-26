import { asyncState } from "lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import {
  GET_CALCULATE_INFO,
  GET_CALCULATE_INFO_ERROR,
  GET_CALCULATE_INFO_SUCCESS,
} from "./actions";
import { DashboardAction, DashboardState } from "./types";

const initialDashboardState: DashboardState = {
  dashboardCalculateInfo: asyncState.initial(),
};

export const dashboard = createReducer<DashboardState, DashboardAction>(
  initialDashboardState,
  {
    [GET_CALCULATE_INFO]: (state) => ({
      ...state,
      dashboardCalculateInfo: asyncState.load(),
    }),
    [GET_CALCULATE_INFO_SUCCESS]: (state, action) => ({
      ...state,
      dashboardCalculateInfo: asyncState.success(action.payload),
    }),
    [GET_CALCULATE_INFO_ERROR]: (state, action) => ({
      ...state,
      dashboardCalculateInfo: asyncState.error(action.payload),
    }),
  }
);
