import { call, put, takeLatest } from "redux-saga/effects";
import {
  ContractMemberInfo,
  deleteContractMemberList,
  getContractMemberList,
  postContractMemberList,
} from "api/contractMemberAxios";
import {
  deleteContractMemberAsync,
  DELETE_CONTRACT_MEMBER,
  getContractMemberAsync,
  GET_CONTRACT_MEMBER,
  postUserMemberAsync,
  POST_USER_LIST,
} from "./actions";

function* getContractMemberSaga(
  action: ReturnType<typeof getContractMemberAsync.request>
) {
  try {
    const contractmemberInfo: Array<ContractMemberInfo> = yield call(
      getContractMemberList,
      action.payload
    );

    yield put(getContractMemberAsync.success(contractmemberInfo));
  } catch (e: any) {
    console.log("saga error");
    yield put(getContractMemberAsync.failure(e));
  }
}

function* postContractMemberSaga(
  action: ReturnType<typeof postUserMemberAsync.request>
) {
  try {
    const postcontractmemberInfo: Array<ContractMemberInfo> = yield call(
      postContractMemberList,
      action.payload
    );

    yield put(postUserMemberAsync.success(postcontractmemberInfo));
  } catch (e: any) {
    yield put(postUserMemberAsync.failure(e));
  }
}

function* deleteContractMemberSaga(
  action: ReturnType<typeof deleteContractMemberAsync.request>
) {
  try {
    const deletecontractmemberInfo: any = yield call(
      deleteContractMemberList,
      action.payload
    );

    yield put(deleteContractMemberAsync.success(deletecontractmemberInfo));
  } catch (e: any) {
    yield put(deleteContractMemberAsync.failure(e));
  }
}

export function* contractMemberSaga() {
  yield takeLatest(GET_CONTRACT_MEMBER, getContractMemberSaga);
  yield takeLatest(POST_USER_LIST, postContractMemberSaga);
  yield takeLatest(DELETE_CONTRACT_MEMBER, deleteContractMemberSaga);
}
