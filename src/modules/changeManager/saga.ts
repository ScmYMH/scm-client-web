import {
  delCntrtChgInfo,
  getContractList,
  postCntrtChgInfo,
  putCntrtChgInfo,
} from "api/changeManagerAxios";
import {
  clearCntrtChgInfoListAsync,
  delCntrtChgInfoAsync,
  delCntrtChgInfoCancelAsync,
  DELETE_CNTRT_CHG_INFO,
  getContractListAsync,
  GET_CONTRACT_LIST,
  postCntrtChgInfoAsync,
  POST_CNTRT_CHG_INFO,
  putCntrtChgInfoAsync,
  putCntrtChgInfoConfirmAsync,
  PUT_CNTRT_CHG_INFO,
} from "./actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { CntrtChangeInfo, CommonInfo } from "./types";

function* getContractListSaga(
  action: ReturnType<typeof getContractListAsync.request>
) {
  try {
    const commonInfo: Array<CommonInfo> = yield call(
      getContractList,
      action.payload
    );
    yield put(getContractListAsync.success(commonInfo));
    yield put(clearCntrtChgInfoListAsync.success());
  } catch (e: any) {
    yield put(getContractListAsync.failure(e));
  }
}

function* postCntrtChgInfoSaga(
  action: ReturnType<typeof postCntrtChgInfoAsync.request>
) {
  try {
    const cntrtChangeInfo: Array<CntrtChangeInfo> = yield call(
      postCntrtChgInfo,
      action.payload
    );
    yield put(postCntrtChgInfoAsync.success(cntrtChangeInfo));
  } catch (e: any) {
    yield put(postCntrtChgInfoAsync.failure(e));
  }
}

function* putCntrtChgInfoSaga(
  action: ReturnType<typeof putCntrtChgInfoAsync.request>
) {
  try {
    const cntrtConfirmResult: boolean = yield call(
      putCntrtChgInfo,
      action.payload.seqNoArray
    );
    yield put(putCntrtChgInfoAsync.success(cntrtConfirmResult));
    const cntrtChangeInfoListTemp = action.payload.cntrtChangeInfoList;
    if (cntrtConfirmResult) {
      action.payload.seqNoArray.map((seqNo) => {
        cntrtChangeInfoListTemp
          ?.filter((cntrtChangeInfo) => seqNo === cntrtChangeInfo.seqNo)
          .map((cntrtChangeInfo) => {
            cntrtChangeInfo.cmptYn = "확정";
          });
      });
      yield put(putCntrtChgInfoConfirmAsync.success(cntrtChangeInfoListTemp));
    }
  } catch (e: any) {
    yield put(putCntrtChgInfoAsync.failure(e));
  }
}

function* delCntrtChgInfoSaga(
  action: ReturnType<typeof delCntrtChgInfoAsync.request>
) {
  try {
    let newParam = "";
    action.payload.seqNoArray.map((seqNo) => {
      newParam = newParam + seqNo + ",";
    });
    const cntrtCancelResult: boolean = yield call(delCntrtChgInfo, newParam);
    yield put(delCntrtChgInfoAsync.success(cntrtCancelResult));

    // Redux에 있는 CntrtChgInfo 삭제
    const cntrtChangeInfoListTemp = action.payload.cntrtChangeInfoList;
    if (cntrtCancelResult) {
      const newList = cntrtChangeInfoListTemp?.filter((cntrtChangeInfo) => {
        // cntrtIdArray.find((cntrtId) => cntrtId === cntrtChangeInfo.cntrtId) ? false : true;
        let flag = true;
        action.payload.seqNoArray.map((seqNo) => {
          if (seqNo === cntrtChangeInfo.seqNo) flag = false;
        });
        if (flag) return true;
        else return false;
      });
      yield put(delCntrtChgInfoCancelAsync.success(newList));
    }
  } catch (e: any) {
    console.log("delCntrtChgInfoSaga error");
    yield put(delCntrtChgInfoAsync.failure(e));
  }
}

export function* changeManagerSaga() {
  yield takeLatest(GET_CONTRACT_LIST, getContractListSaga);
  yield takeLatest(POST_CNTRT_CHG_INFO, postCntrtChgInfoSaga);
  yield takeLatest(PUT_CNTRT_CHG_INFO, putCntrtChgInfoSaga);
  yield takeLatest(DELETE_CNTRT_CHG_INFO, delCntrtChgInfoSaga);
}
