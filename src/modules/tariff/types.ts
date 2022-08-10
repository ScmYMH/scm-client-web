import * as actions from "./actions";
import { AsyncState } from "lib/reducerUtils";
import { ActionType } from "typesafe-actions";

export type TariffAction = ActionType<typeof actions>;

export type TariffState = {
  tariffHeaderCond: AsyncState<TariffHeaderCond, Error>;
  tariffInfo: AsyncState<TariffInfo, Error>;
  destInfoList: AsyncState<Array<DestInfo>, Error>;
  lccInfoList: AsyncState<Array<LccInfo>, Error>;
};

// get TariffHeaderCondition res 타입
export interface TariffHeaderCond {
  bizTcdArr: []; // (수출-EX, 역내판매운송-LD)
  svcTcdArr: []; // (공로운송-ROAD, 해상운송-VSL)
  arApCcdArr: []; // (매출-AR, 매입-AP)
  detlSvcTcdArr: []; // 코드-명 조합으로 표기
}

// post tariffInfo request
export interface TariffInfoParam {
  cntrtId: string; // 계약 ID -> 계약 ID를 클릭했을 떄 타리프 창이 뜨기 때문에 그 계약 ID 값 가져오기
  trffNm: string; // 타리프 NM
  trffDesc: string; // 타리프 설명
  bizTcd: string; //사업유형코드 (사업영역코드는 뭐징?)
  arApCcd: string; // 매출매입구분코드
  svcTcd: string; // 서비스유형코드
  detlSvcTcd: string; // 상세서비스유형
}

// post tariffInfo response
export interface TariffInfo {
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

export interface TariffCondParam {
  lccCd: string;
  departNodeCd: string;
  arrivalNodeCd: string;
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
