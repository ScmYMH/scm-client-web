import axios from "axios";
import {
  CodeDefinition,
  DestInfoParam,
  LccInfoParam,
  TariffCondH,
  TariffHeader,
} from "modules/tariff/types";

export async function getTariffHeaderAxios(params: any) {
  console.log(
    "getTariffHeaderAxios =======> cntrtId : ",
    params.cntrtId,
    ", tariffId : ",
    params.trffId
  );
  const response = await axios.get<TariffHeader>(
    `http://3.37.155.50:8000/tariff/header/${params.cntrtId}/${params.trffId}`
  );
  return response.data;
}

export async function postTariffHeaderAxios(params: any) {
  const response = await axios.post<TariffHeader>(
    `http://3.37.155.50:8000/tariff/header`,
    params
  );
  return response.data;
}

export async function getTariffCondHAxios(params: any) {
  console.log(
    "ㅎetTariffCondHAxios ==========> cntrtId : ",
    params.cntrtId,
    ", trffId : ",
    params.trffId
  );
  const response = await axios.get<Array<TariffCondH>>(
    `http://3.37.155.50:8000/tariff/${params.cntrtId}/${params.trffId}`
  );
  return response.data;
}

export async function postTariffCondHAxios(params: any) {
  console.log("posttariffCondHAxios params : ", params);
  const response = await axios.post<any>(
    `http://3.37.155.50:8000/tariff`,
    params
  );
  return response.data;
}

export async function delTariffCondHAxios(seqNoParam: string) {
  const response = await axios.delete<Array<TariffCondH>>(
    `http://3.37.155.50:8000/tariff/${seqNoParam}`
  );
  return response.data;
}

export async function getDestInfoAxios() {
  const response = await axios.get<DestInfoParam>(
    `http://3.37.155.50:8000/tariff/searchNode`
  );
  return response.data;
}

export async function getLccInfoAxios(params: any) {
  const response = await axios.get<LccInfoParam>(
    `http://3.37.155.50:8000/tariff/searchLcc?lccCd=${params.lccCd}&subLccCd=${params.subLccCd}&lccCdNm=${params.lccCdNm}`
  );
  return response.data;
}

export async function getCodeDefAxios(params: any) {
  const response = await axios.get<Array<CodeDefinition>>(
    `http://3.37.155.50:8000/coa/code`
  );
  return response.data;
}
