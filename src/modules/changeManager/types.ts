import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { asyncState, AsyncState } from 'lib/reducerUtils';

export type ChangeManagerAction = ActionType<typeof actions>;

export type ChangeManagerState = {
	commonInfoList: AsyncState<Array<CommonInfo>, Error>;
	cntrtChangeInfoList: AsyncState<Array<CntrtChangeInfo>, Error>;
	cntrtConfirmResult: AsyncState<boolean, Error>;
	cntrtCancelResult: AsyncState<boolean, Error>;
};

//get ContractList res 타입
export interface CommonInfo {
	cntrtId: string; //계약 ID
	cntrtNm: string; // 계약 명
	cntrtScd: string; // 계약 상태코드
	cntrtStartDate: string; // 계약 시작 일
	cntrtEndDate: string; // 계약 종료 일
}

// postCntrtChgInfo req 타입
export interface ManagerChangeInfo {
	cntrtId: string[]; // 계약 ID List
	preActorId: string; // 이전 계약담당자 ID
	aftActorId: string; // 이후 계약담당자 ID
	validDate: string; // 유효 시작일
	reasonDesc: string; // 변경사유 코멘트
}

// postCntrtChgInfo res 타입
// 재할당계약정보
export interface CntrtChangeInfo {
	seqNo: number;
	cntrtId: string; // 계약 ID
	cntrtNm: string; // 계약명
	preActorNm: string; // 이전 계약담당자 ID로 이름 조회
	aftActorNm: string; // 이후 계약담당자 ID로 이름 조회
	validDate: string; // 유효 시작일 -> format 변경 (20220714 -> 7/14/22)
	reasonDesc: string; // 변경사유 코멘트
	cmptYn: string; // 확정 여부
}
