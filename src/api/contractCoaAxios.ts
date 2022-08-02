import axios from "axios";

export async function getContractInfoListApi(params: any) {
  const response = await axios.get<ContractInfo>(
    `http://localhost:9999/coa/search?cntrtId=${params.cntrtId}&cntrtNm=${params.cntrtNm}&insDate=${params.insDate}&cdvMeaning=${params.cdvMeaning}`
  );

  return response.data;
}

export async function getTariffInfoListApi(params: any) {
  const response = await axios.get<TariffInfo>(
    `http://localhost:9999/coa/tariff?cntrtId=${params.cntrtId}&svcNm=${params.svcNm}&detlSvcNm=${params.detlSvcNm}`
  );
  return response.data;
}

export interface TariffInfo {
  trff_nm: string;
  trff_desc: string;
  biz_nm: string;
  svc_nm: string;
  detl_svc_nm: string;
  ins_date: string;
}

export interface ContractInfo {
  cntrt_nm: string;
  cd_v_meaning: string;
  cntrt_start_date: string;
  cntrt_end_date: string;
  user_nm: string;
  cntrt_id: string;
  ins_date: string;
}
