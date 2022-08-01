import { delCntrtChgInfo, getContractList, postCntrtChgInfo, putCntrtChgInfo } from 'api/changeManagerAxios';
import {
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
} from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CntrtChangeInfo, CommonInfo } from './types';

function* getContractListSaga(action: ReturnType<typeof getContractListAsync.request>) {
	try {
		console.log('getContractListSaga : action.payload', action.payload);
		const commonInfo: Array<CommonInfo> = yield call(getContractList, action.payload);
		yield put(getContractListAsync.success(commonInfo));
	} catch (e: any) {
		console.log('saga error');
		yield put(getContractListAsync.failure(e));
	}
}

function* postCntrtChgInfoSaga(action: ReturnType<typeof postCntrtChgInfoAsync.request>) {
	try {
		console.log('postCntrtChgInfoSaga : action.payload', action.payload);
		const cntrtChangeInfo: Array<CntrtChangeInfo> = yield call(postCntrtChgInfo, action.payload);
		yield put(postCntrtChgInfoAsync.success(cntrtChangeInfo));
	} catch (e: any) {
		console.log('postCntrtChgInfoSaga error');
		yield put(postCntrtChgInfoAsync.failure(e));
	}
}

function* putCntrtChgInfoSaga(action: ReturnType<typeof putCntrtChgInfoAsync.request>) {
	try {
		console.log('putCntrtChgInfoSaga : action.payload', action.payload);
		const cntrtConfirmResult: boolean = yield call(putCntrtChgInfo, action.payload.seqNoArray);
		yield put(putCntrtChgInfoAsync.success(cntrtConfirmResult));
		const cntrtChangeInfoListTemp = action.payload.cntrtChangeInfoList;
		if (cntrtConfirmResult) {
			action.payload.seqNoArray.map((seqNo) => {
				cntrtChangeInfoListTemp
					?.filter((cntrtChangeInfo) => seqNo === cntrtChangeInfo.seqNo)
					.map((cntrtChangeInfo) => {
						cntrtChangeInfo.cmptYn = '확정';
					});
			});
			yield put(putCntrtChgInfoConfirmAsync.success(cntrtChangeInfoListTemp));
			console.log(
				'putCntrtChgInfoSaga에서 확정으로 바꾸기 :: cntrtChangeInfoListTemp : ',
				cntrtChangeInfoListTemp,
			);
		}
	} catch (e: any) {
		console.log('putCntrtChgInfoSaga error');
		yield put(putCntrtChgInfoAsync.failure(e));
	}
}

function* delCntrtChgInfoSaga(action: ReturnType<typeof delCntrtChgInfoAsync.request>) {
	try {
		console.log('delCntrtChgInfoSaga : action.payload', action.payload);

		let newParam = '';
		action.payload.seqNoArray.map((seqNo) => {
			newParam = newParam + seqNo + ',';
		});
		console.log('delCntrtChgInfoSaga : newParam ---- ', newParam);
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
			/// 1 2 3 4 listTemp (-- ID)
			/// 1 3		cntrtIdArray

			/// 1 -> 1,3

			console.log('delCntrtChgInfoSaga : newList ---', newList);
			yield put(delCntrtChgInfoCancelAsync.success(newList));
		}
	} catch (e: any) {
		console.log('delCntrtChgInfoSaga error');
		yield put(delCntrtChgInfoAsync.failure(e));
	}
}

export function* changeManagerSaga() {
	yield takeLatest(GET_CONTRACT_LIST, getContractListSaga);
	yield takeLatest(POST_CNTRT_CHG_INFO, postCntrtChgInfoSaga);
	yield takeLatest(PUT_CNTRT_CHG_INFO, putCntrtChgInfoSaga);
	yield takeLatest(DELETE_CNTRT_CHG_INFO, delCntrtChgInfoSaga);
}
