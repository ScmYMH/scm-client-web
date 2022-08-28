import axios from "axios";
export async function getCalculateInfo(calSelectParams: any) {
  console.log(calSelectParams);
  // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.
  const response = await axios.get<CalculateInfo>(
    `http://localhost:9999/calculate?startDate=${calSelectParams.startDate}&endDate=${calSelectParams.endDate}&lspId=${calSelectParams.lspId}&closeNoYn=${calSelectParams.closeNoYn}&vslCd=${calSelectParams.vslCd}&transOrderNo=${calSelectParams.transOrderNo}&cdVmeaning=${calSelectParams.cdVmeaning}`
  );
  console.log(response.data);
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
// response type 정의
export interface CalculateInfo {
    nation_nm:string; 
    lsp_id:string;
    cd_v_meaning:string;
    vsl_cd: string;
    vsl_nm: string;
    trans_order_no:string;
    close_no_yn:string;
    clear_curr:string;
    clear_qty:string;
    clear_amt:string;
    acctg_amt:string;
    acctg_yn:string;
}
