import axios from "axios";
import {
  CodeDefinition,
  DestInfoParam,
  LccInfoParam,
  TariffCondH,
  TariffHeader,
  TariffHeaderParam,
} from "modules/tariff/types";

export async function postTariffHeaderAxios(
  tariffHeaderParam: TariffHeaderParam
) {
  const response = await axios.post<TariffHeader>(
    `http://localhost:9092/contract/tariff/header`,
    tariffHeaderParam
  );
  return response.data;
}

export async function getTariffCondHAxios(params: any) {
  const response = await axios.get<TariffCondH>(
    `http://localhost:9092/contract/tariff/${params.cntrtId}/${params.trffId}`
  );
  return response.data;
}

export async function getDestInfoAxios() {
  const response = await axios.get<DestInfoParam>(
    `http://localhost:9092/contract/tariff/searchNode`
  );
  return response.data;
}

export async function getLccInfoAxios(params: any) {
  const response = await axios.get<LccInfoParam>(
    `http://localhost:9092/contract/tariff/searchLcc?lccCd=${params.lccCd}&subLccCd=${params.subLccCd}&lccCdNm=${params.lccCdNm}`
  );
  return response.data;
}

export async function getCodeDefAxios(params: any) {
  const response = await axios.get<Array<CodeDefinition>>(
    `http://localhost:9999/coa/code`
  );
  return response.data;
}
