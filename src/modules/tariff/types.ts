import * as actions from "./actions";
import { AsyncState } from "lib/reducerUtils";
import { ActionType } from "typesafe-actions";

export type TariffAction = ActionType<typeof actions>;

export type TariffState = {
  tariffHeader: AsyncState<TariffHeader, Error>;
  tariffCondHList: AsyncState<Array<TariffCondH>, Error>;
  destInfoList: AsyncState<Array<DestInfo>, Error>;
  lccInfoList: AsyncState<Array<LccInfo>, Error>;
  codeDefList: AsyncState<Array<CodeDefinition>, Error>;
};

// post tariffHeader request
export interface TariffHeaderParam {
  cntrtId: string; // 계약 ID -> 계약 ID를 클릭했을 떄 타리프 창이 뜨기 때문에 그 계약 ID 값 가져오기
  trffId: number;
  trffNm: string; // 타리프 NM
  trffDesc: string; // 타리프 설명
  bizTcd: string; //사업유형코드 (사업영역코드는 뭐징?)
  arApCcd: string; // 매출매입구분코드
  svcTcd: string; // 서비스유형코드
  detlSvcTcd: string; // 상세서비스유형
  cntrtStatDate: string; // 계약시작일
  cntrtEndDate: string; //계약종료일
  cntrtCurrCd: string; // 계약 통화 코드
}

// post tariffHeader response
export interface TariffHeader {
  trffId: number; // 타리프 ID
  cntrtId: string; // 계약 ID
  svcTcd: string; // 서비스유형코드
  trffNm: string; // 타리프 name
  trffDesc: string; // 타리프 설명
  bizTcd: string; // 사업유형코드
  arApCcd: string; // 매출매입구분코드
  detlSvcTcd: string; // 상세서비스유형코드
  bizDivCd: string; // 사업영역코드 (null)
  custId: string; //  거래처 ID (null)
  corpId: string; // 법인 ID
  delYn: string; // 삭제여부
}

// get tariffInfo response
export interface TariffCondH {
  seqNo: number; // 일련번호
  cntrtId: string; // 계약 ID
  trffId: number; // 타리프 ID
  depCd: string; // 출발지코드
  depNm: string; // 출발지명
  arrCd: string; // 도착지코드
  arrNm: string; // 도착지명
  lccCd: string; // 물류비코드
  subLccCd: string; // 세부물류비코드
  lccCdDesc: string; // 물류비코드설명
  trffStatDate: string; // 타리프시작일자
  trffEndDate: string; // 타리프종료일자
  cntrtCurrCd: string; // 계약통화코드
  payCurrCd: string; // 지불통화코드
  prodGcd: string; // 제품그룹코드(품종명)
  incoCd: string; // 인도조건코드
  unitPrice: number; // 계약단가 (bigDecimal)
  calUnitCd: string; // 계산단위
  condId: string; // 조건ID
  condNm: string; // 조건명
}

export interface TariffCondParam {
  validDate: string;
  lccCd: string;
  departNodeCd: string;
  departNodeNm: string;
  arrivalNodeCd: string;
  arrivalNodeNm: string;
}

// get destInfo req
export interface DestInfoParam {
  nodeCd: string;
  nodeDesc: string;
  nationNm: string;
  nationCd: string;
}

// get destInfo res
export interface DestInfo {
  nodeCd: string; // 목적지코드
  nodeDesc: string; // 목적지명
  nationCd: string; // 국가명
  nationNm: string; // 국가코드
  deliveryAreaCd: string; // 대권역
  boundaryCd: string; // 소권역
  delYn: string;
}

export interface LccInfoParam {
  lccCd: string; // 물류비코드
  subLccCd: string; // 세부뮬류비코드
  lccCdNm: string; // 물류비명
}

export interface LccInfo {
  seqNo: number;
  lccCd: string; // 물류비코드
  subLccCd: string; // 세부물류비코드
  lccCdNm: string; // 물류비코드명
  lccCdDesc: string; // 물류비코드설명
  trnsCostTcd: string; // 운송비유형코드
  trnsCostSubTcd: string; // 세부운송비유형코드
  trffUseYn: string; // 요율사용여부
  netAmtYn: string; // 순액총액여부
  delYn: string; // 삭제여부
}

export interface CodeDefinition {
  cd_tp: string;
  cd_tp_meaning: string;
  cd_v: string;
  cd_v_meaning: string;
}
