import * as actions from "./actions";
import { AsyncState } from "lib/reducerUtils";
import { ActionType } from "typesafe-actions";

export type TariffAction = ActionType<typeof actions>;

export type TariffState = {
  tariffHeaderCond: AsyncState<TariffHeaderCond, Error>;
};

// get TariffHeaderCondition res 타입
export interface TariffHeaderCond {
  bizTcdArr: []; // (수출-EX, 역내판매운송-LD)
  svcTcdArr: []; // (공로운송-ROAD, 해상운송-VSL)
  arApCcdArr: []; // (매출-AR, 매입-AP)
  detlSvcTcdArr: []; // 코드-명 조합으로 표기
}
