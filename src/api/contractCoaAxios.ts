import axios from "axios";

export async function getContractInfoListApi(params: any) {
  const response = await axios.get<ContractInfo>(
    `http://localhost:9999/coa/search?cntrtId=${params.cntrtId}&cntrtNm=${params.cntrtNm}&insDate=${params.insDate}&cdvMeaning=${params.cdvMeaning}`
  );
  console.log("contractInfo : ", response.data);
  return response.data;
}

export async function insertContractInfo(params: ContractInfo) {
  const response = await axios.post<ContractInfo>(
    `http://localhost:9999/coa`,
    params
  );
  return response.data;
}

export async function updateContractInfo(params: ContractInfo) {
  const response = await axios.put<ContractInfo>(
    `http://localhost:9999/coa`,
    params
  );
  return response.data;
}

export async function deleteContractInfo(cntrtId: ContractInfo) {
  console.log("deleteContractInfo>>>>>>", cntrtId);
  const response = await axios.put<ContractInfo>(
    `http://localhost:9999/coa/${cntrtId}`
  );
  console.log("deleteContractInfo>>>>>>", response.data);
  return response.data;
}

export async function getTariffInfoListApi(params: any) {
  const response = await axios.get<TariffInfo>(
    `http://localhost:9999/coa/tariff?cntrtId=${params.cntrtId}&svcNm=${params.svcNm}&detlSvcNm=${params.detlSvcNm}`
  );
  return response.data;
}

export async function getContractInfoDefinitionApi(params: any) {
  const response = await axios.get<ContractInfoDefinition>(
    `http://localhost:9999/coa/code`
  );
  console.log(response.data);
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
}
