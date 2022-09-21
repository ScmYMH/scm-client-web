import axios from "axios";

export async function getContractInfoListApi(params: any) {
  const response = await axios.get<ContractInfo>(
    `http://3.37.155.50:8000/coa/search?cntrtId=${params.cntrtId}&cntrtNm=${params.cntrtNm}&insDate=${params.insDate}&cdvMeaning=${params.cdvMeaning}`
  );
  console.log("getContractInfoListApi : ", response.data)
  return response.data;
}

export async function insertContractInfo(params: ContractInfo) {
  const response = await axios.post<ContractInfo>(
    `http://3.37.155.50:8000/coa`,
    params
  );
  return response.data;
}

export async function updateContractInfo(params: ContractInfo) {
  const response = await axios.put<ContractInfo>(
    `http://3.37.155.50:8000/coa`,
    params
  );
  return response.data;
}

export async function deleteContractInfo(cntrtId: ContractInfo) {
  const response = await axios.put<ContractInfo>(
    `http://3.37.155.50:8000/coa/${cntrtId}`
  );
  return response.data;
}

export async function getTariffInfoListApi(params: any) {
  const response = await axios.get<TariffInfo>(
    `http://3.37.155.50:8000/coa/tariff?cntrtId=${params.cntrtId}&svcNm=${params.svcNm}&detlSvcNm=${params.detlSvcNm}`
  );
  return response.data;
}

export async function getContractInfoDefinitionApi(params: any) {
  const response = await axios.get<ContractInfoDefinition>(
    `http://3.37.155.50:8000/coa/code`
  );
  return response.data;
}

export interface ContractInfoDefinition {
  [x: string]: any;
  cd_tp: string;
  cd_tp_meaning: string;
  cd_v: string;
  cd_v_meaning: string;
}

export interface TariffInfo {
  [x: string]: any;
  trff_id: number;
  trff_nm: string;
  trff_desc: string;
  biz_nm: string;
  svc_nm: string;
  detl_svc_nm: string;
  ins_date: string;
  detl_svc_tcd: string;
}

export interface ContractInfo {
  cntrt_nm: string;
  cd_v_meaning: string;
  cntrt_start_date: string;
  cntrt_end_date: string;
  user_nm: string;
  cntrt_id: string | null;
  ins_date: string;
  cntrt_curr_cd: string;
  ins_person_id: string;
  cntrt_tcd: string;
  cntrt_tcd_name: string;
}
