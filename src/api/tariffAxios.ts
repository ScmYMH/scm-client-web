import axios from "axios";
import {
  AllTariffInfo,
  CodeDefinition,
  DestInfoParam,
  LccInfoParam,
  TariffCondH,
} from "modules/tariff/types";

const customAxios = async (url: any, method: any, data: any) => {
  const response = await axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export async function getTariffHeaderAxios(params: any) {
  // const response = await axios.get<TariffHeader>(
  //   `http://3.37.155.50:8000/tariff/header/${params.cntrtId}/${params.trffId}`
  // );
  // return response.data;
  return customAxios(
    `http://3.37.155.50:8000/tariff/header/${params.cntrtId}/${params.trffId}`,
    "get",
    null
  );
}

export async function postTariffHeaderAxios(params: any) {
  // const response = await axios.post<TariffHeader>(
  //   `http://3.37.155.50:8000/tariff/header`,
  //   params
  // );
  // return response.data;
  return customAxios("http://3.37.155.50:8000/tariff/header", "post", params);
}

export async function getTariffCondHAxios(params: any) {
  // const response = await axios.get<Array<TariffCondH>>(
  //   `http://3.37.155.50:8000/tariff/${params.cntrtId}/${params.trffId}`
  // );
  // return response.data;
  return customAxios(
    `http://3.37.155.50:8000/tariff/${params.cntrtId}/${params.trffId}`,
    "get",
    null
  );
}

export async function postTariffCondHAxios(params: any) {
  // const response = await axios.post<any>(
  //   `http://3.37.155.50:8000/tariff`,
  //   params
  // );
  // return response.data;
  return customAxios(`http://3.37.155.50:8000/tariff`, "post", params);
}

export async function delTariffCondHAxios(seqNoParam: string) {
  // const response = await axios.delete<Array<TariffCondH>>(
  //   `http://3.37.155.50:8000/tariff/${seqNoParam}`
  // );
  // return response.data;
  return customAxios(
    `http://3.37.155.50:8000/tariff/${seqNoParam}`,
    "delete",
    null
  );
}

export async function getDestInfoAxios() {
  // const response = await axios.get<DestInfoParam>(
  //   `http://3.37.155.50:8000/tariff/searchNode`
  // );
  // return response.data;
  return customAxios(`http://3.37.155.50:8000/tariff/searchNode`, "get", null);
}

export async function getLccInfoAxios(params: any) {
  // const response = await axios.get<LccInfoParam>(
  //   `http://3.37.155.50:8000/tariff/searchLcc?lccCd=${params.lccCd}&subLccCd=${params.subLccCd}&lccCdNm=${params.lccCdNm}`
  // );
  // return response.data;
  return customAxios(
    `http://3.37.155.50:8000/tariff/searchLcc?lccCd=${params.lccCd}&subLccCd=${params.subLccCd}&lccCdNm=${params.lccCdNm}`,
    "get",
    null
  );
}

export async function getCodeDefAxios(params: any) {
  // const response = await axios.get<Array<CodeDefinition>>(
  //   `http://3.37.155.50:8000/coa/code`
  // );
  // return response.data;
  return customAxios(`http://3.37.155.50:8000/coa/code`, "get", null);
}

export async function getAllTariffInfoAxios(cntrtId: string) {
  // const response = await axios.get<Array<AllTariffInfo>>(
  //   `http://localhost:9092/tariff/allList/${cntrtId}`
  // );
  // return response.data;
  return customAxios(
    `http://3.37.155.50:8000/tariff/allList/${cntrtId}`,
    "get",
    null
  );
}

export async function postContractCopyAxios(params: any) {
  // const response = await axios.post<any>(
  //   `http://localhost:9092/tariff/copy`,
  //   params
  // );
  // return response.data;
  return customAxios(`http://3.37.155.50:8000/tariff/copy`, "post", params);
}
