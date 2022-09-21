import {
  delTariffCondHAxios,
  getAllTariffInfoAxios,
  getCodeDefAxios,
  getDestInfoAxios,
  getLccInfoAxios,
  getTariffCondHAxios,
  getTariffHeaderAxios,
  postContractCopyAxios,
  postTariffCondHAxios,
  postTariffHeaderAxios,
  putTariffHeaderAxios,
} from "api/tariffAxios";
import { RootState } from "modules";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { callbackify } from "util";
import {
  deleteTariffCondHAsync,
  DELETE_TARIFF_COND_H,
  getAllTariffInfoAsync,
  getCodeDefAsync,
  getDestInfoAsync,
  getLccInfoAsync,
  getTariffCondHAsync,
  getTariffHeaderAsync,
  GET_ALL_TARIFF_INFO,
  GET_CODE_DEFINITION,
  GET_DEST_INFO,
  GET_LCC_INFO,
  GET_TARIFF_COND_H,
  GET_TARIFF_HEADER,
  postContractCopyAsync,
  postTariffCondHAsync,
  postTariffHeaderAsync,
  POST_CONTRACT_COPY,
  POST_TARIFF_COND_H,
  POST_TARIFF_HEADER,
  putTariffHeaderAsync,
  PUT_TARIFF_HEADER,
  resetTariffCondHAsync,
  resetTariffHeaderAsync,
  RESET_TARIFF_COND_H,
  RESET_TARIFF_HEADER,
  saveTariffParamAsync,
  SAVE_TARIFF_PARAM,
} from "./actions";
import {
  AllTariffInfo,
  CodeDefinition,
  DestInfo,
  LccInfo,
  TariffCondH,
  TariffHeader,
  TariffParam,
} from "./types";

function* saveTariffHeaderParamSaga(
  action: ReturnType<typeof saveTariffParamAsync.request>
) {
  try {
    // const tariffHeaderParam : TariffHeaderParam = yield select((state: RootState) => state.tariff.tariffHeaderParam);
    yield put(saveTariffParamAsync.success(action.payload));
  } catch (e: any) {
    console.log("getCntrtIdTariffIdSaga error");
    yield put(saveTariffParamAsync.failure(e));
  }
}

function* getTariffHeaderSaga(
  action: ReturnType<typeof getTariffHeaderAsync.request>
) {
  try {
    const tariffHeader: TariffHeader = yield call(
      getTariffHeaderAxios,
      action.payload
    );
    yield put(getTariffHeaderAsync.success(tariffHeader));
  } catch (e: any) {
    console.log("getTariffHeaderSaga error");
    yield put(getTariffHeaderAsync.failure(e));
  }
}

function* postTariffHeaderSaga(
  action: ReturnType<typeof postTariffHeaderAsync.request>
) {
  try {
    const tariffHeader: TariffHeader = yield call(
      postTariffHeaderAxios,
      action.payload
    );
    const tariffParam = yield select(
      (state: RootState) => state.tariff.tariffParam
    );
    const newTariffParam = {
      ...tariffParam.data,
      trffId: tariffHeader.trffId,
    };
    yield put(saveTariffParamAsync.success(newTariffParam));
    yield put(postTariffHeaderAsync.success(tariffHeader));
    alert("저장되었습니다");
  } catch (e: any) {
    console.log("postTariffInfoSaga error");
    yield put(postTariffHeaderAsync.failure(e));
  }
}

function* putTariffHeaderSaga(
  action: ReturnType<typeof putTariffHeaderAsync.request>
) {
  try {
    const tariffHeader: TariffHeader = yield call(
      putTariffHeaderAxios,
      action.payload
    );
    yield put(postTariffHeaderAsync.success(tariffHeader));
    alert("수정되었습니다");
  } catch (e: any) {
    console.log("putTariffHeaderSaga error");
    yield put(putTariffHeaderAsync.failure(e));
  }
}

function* getTariffCondHSaga(
  action: ReturnType<typeof getTariffCondHAsync.request>
) {
  try {
    const tariffCondHList: Array<TariffCondH> = yield call(
      getTariffCondHAxios,
      action.payload
    );
    yield put(getTariffCondHAsync.success(tariffCondHList));
  } catch (e: any) {
    console.log("getTariffCondHSaga error");
    yield put(getTariffCondHAsync.failure(e));
  }
}

function* resetTariffHeaderSaga(
  action: ReturnType<typeof resetTariffHeaderAsync.request>
) {
  try {
    yield put(resetTariffHeaderAsync.success(action.payload));
  } catch (e: any) {
    yield put(resetTariffHeaderAsync.failure(e));
  }
}

function* resetTariffCondHSaga(
  action: ReturnType<typeof resetTariffCondHAsync.request>
) {
  try {
    const tariffCondHList: Array<TariffCondH> = [];
    yield put(resetTariffCondHAsync.success(tariffCondHList));
  } catch (e: any) {
    yield put(resetTariffCondHAsync.failure(e));
  }
}

function* postTariffCondHSaga(
  action: ReturnType<typeof postTariffCondHAsync.request>
) {
  try {
    const tariffCondHList: Array<TariffCondH> = yield call(
      postTariffCondHAxios,
      action.payload
    );
    yield put(postTariffCondHAsync.success(tariffCondHList));
    alert("저장되었습니다");
  } catch (e: any) {
    yield put(postTariffCondHAsync.failure(e));
  }
}

function* deleteTariffCondHSaga(
  action: ReturnType<typeof deleteTariffCondHAsync.request>
) {
  try {
    let newParam = "";
    action.payload.map((seqNo) => {
      newParam = newParam + seqNo + ",";
    });
    const tariffCondHList: Array<TariffCondH> = yield call(
      delTariffCondHAxios,
      newParam
    );
    yield put(deleteTariffCondHAsync.success(tariffCondHList));
  } catch (e: any) {
    yield put(deleteTariffCondHAsync.failure(e));
  }
}

function* getDestInfoSaga(action: ReturnType<typeof getDestInfoAsync.request>) {
  try {
    const destInfoList: Array<DestInfo> = yield call(getDestInfoAxios);
    yield put(getDestInfoAsync.success(destInfoList));
  } catch (e: any) {
    console.log("getDestInfoSaga error");
    yield put(getDestInfoAsync.failure(e));
  }
}

function* getLccInfoSaga(action: ReturnType<typeof getLccInfoAsync.request>) {
  try {
    const lccInfoList: Array<LccInfo> = yield call(
      getLccInfoAxios,
      action.payload
    );
    yield put(getLccInfoAsync.success(lccInfoList));
  } catch (e: any) {
    console.log("getLccInfoSaga error");
    yield put(getLccInfoAsync.failure(e));
  }
}

function* getCodeDefSaga(action: ReturnType<typeof getCodeDefAsync.request>) {
  try {
    const codeDef: Array<CodeDefinition> = yield call(
      getCodeDefAxios,
      action.payload
    );
    yield put(getCodeDefAsync.success(codeDef));
  } catch (e: any) {
    yield put(getCodeDefAsync.failure(e));
  }
}

function* getAllTariffInfoSaga(
  action: ReturnType<typeof getAllTariffInfoAsync.request>
) {
  try {
    const allTariffInfo: Array<AllTariffInfo> = yield call(
      getAllTariffInfoAxios,
      action.payload
    );
    yield put(getAllTariffInfoAsync.success(allTariffInfo));
  } catch (e: any) {
    yield put(getAllTariffInfoAsync.failure(e));
  }
}

function* postContractCopySaga(
  action: ReturnType<typeof postContractCopyAsync.request>
) {
  try {
    const result: boolean = yield call(postContractCopyAxios, action.payload);
    yield put(postContractCopyAsync.success(result));
  } catch (e: any) {
    yield put(postContractCopyAsync.failure(e));
  }
}

export function* tariffSaga() {
  yield takeLatest(SAVE_TARIFF_PARAM, saveTariffHeaderParamSaga);
  yield takeLatest(GET_TARIFF_HEADER, getTariffHeaderSaga);
  yield takeLatest(POST_TARIFF_HEADER, postTariffHeaderSaga);
  yield takeLatest(PUT_TARIFF_HEADER, putTariffHeaderSaga);
  yield takeLatest(GET_TARIFF_COND_H, getTariffCondHSaga);
  yield takeLatest(RESET_TARIFF_HEADER, resetTariffHeaderSaga);
  yield takeLatest(RESET_TARIFF_COND_H, resetTariffCondHSaga);
  yield takeLatest(POST_TARIFF_COND_H, postTariffCondHSaga);
  yield takeLatest(DELETE_TARIFF_COND_H, deleteTariffCondHSaga);
  yield takeLatest(GET_DEST_INFO, getDestInfoSaga);
  yield takeLatest(GET_LCC_INFO, getLccInfoSaga);
  yield takeLatest(GET_CODE_DEFINITION, getCodeDefSaga);
}

export function* contractCopySaga() {
  yield takeLatest(GET_ALL_TARIFF_INFO, getAllTariffInfoSaga);
  yield takeLatest(POST_CONTRACT_COPY, postContractCopySaga);
}
