import axios from "axios";
import {
  DestInfoParam,
  LccInfoParam,
  TariffHeaderCond,
  TariffInfo,
  TariffInfoParam,
} from "modules/tariff/types";

export async function getTariffHeaderCond() {
  const response = await axios.get<TariffHeaderCond>(
    `http://localhost:9092/contract/tariff/header/cond`
  );
}

export async function postTariffInfo(tariffInfoParam: TariffInfoParam) {
  const response = await axios.post<TariffInfo>(
    `http://localhost:9092/contract/tariff/header`,
    tariffInfoParam
  );
  return response.data;
}

export async function getDestInfo() {
  const response = await axios.get<DestInfoParam>(
    `http://localhost:9092/contract/tariff/searchNode`
  );
  return response.data;
}

export async function getLccInfo(params: any) {
  const response = await axios.get<LccInfoParam>(
    `http://localhost:9092/contract/tariff/searchLcc?lccCd=${params.lccCd}&subLccCd=${params.subLccCd}&lccCdNm=${params.lccCdNm}`
  );
  return response.data;
}
