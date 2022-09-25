import axios from "axios";

export async function getCalculateInfo(calSelectParams: any) {
  // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.
  const response = await axios.get<CalculateInfo>(
    `http://3.37.155.50:8000/calculate/search?startDate=${calSelectParams.startDate}&endDate=${calSelectParams.endDate}&lspId=${calSelectParams.lspId}&dstConfYn=${calSelectParams.dstConfYn}&vslCd=${calSelectParams.vslCd}&transOrderNo=${calSelectParams.transOrderNo}&cdVmeaning=${calSelectParams.cdVmeaning}`
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getCalculateDetailInfo(params: any) {
  const response = await axios.get<CalculateInfo>(
    `http://3.37.155.50:8000/calculate/detail?transOrderNo=${params.transOrderNo}&blDate=${params.blDate}`
  );

  return response.data;
}

// 운임 정산
export async function insertCalculateInfo(params: any) {
  const response = await axios.post<CalculateInfo>(
    `http://3.37.155.50:8000/calculate?transOrderNo=${params.transOrderNo}&facCd=${params.facCd}&blDate=${params.blDate}&invInnerNo=${params.invInnerNo}`
  );
  console.log(response.data);
  return response.data;
}


export async function getVslCodeInfo(params: any) {
  const response = await axios.get<VslCdInfo>(
    `http://3.37.155.50:8000/calculate/vslcode?vslCd=${params.vslCd}&vslNm=${params.vslNm}`
  );
  return response.data;
}

export async function updateFrtStatus(params: any) {
  const response = await axios.put<CalculateInfo>(
    `http://3.37.155.50:8000/calculate/frtstatus`,
    params
  );
  return response.data;
}

export async function updateAccountInfo(params: any) {
  console.log(params);
  const response = await axios.put<CalculateInfo>(
    `http://3.37.155.50:8000/calculate/actConnInfo`,
    params
  );
  return response.data;
}

export interface VslCdInfo {
  vsl_cd: string;
  vsl_nm: string;
  vsl_dead_wt: string;
  vsl_load_posbl_wt: string;
}

// response type 정의
export interface CalculateInfo {
  nation_nm: string;
  lsp_id: string;
  cd_v_meaning: string;
  vsl_cd: string;
  vsl_nm: string;
  trans_order_no: string;
  close_no_yn: string;
  clear_curr: string;
  clear_qty: string;
  clear_amt: string;
  acctg_amt: string;
  acctg_yn: string;
  tot_gross_wt: string;
  vsl_load_posbl_wt: string;
  inv_inner_no: string;
  inv_inner_seq_no: string;
  item_cd: string;
  local_supp_amt: string;
  local_curr_cd: string;
  local_exr: string;
  unit_price: string;
  tot_gross_wt_unit_cd: string;
  fac_cd: string;
  arr_node_nm: string;
  ref_doc_no: string;
  frt_status: string;
  close_no: string;
  dst_conf_yn: string;
}
