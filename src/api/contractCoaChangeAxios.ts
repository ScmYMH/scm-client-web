import axios from "axios";

export async function getContractInfoListApi() {
  const response = await axios.get<ContractChangeInfo>(
    `http://localhost:9999/coaChange/info`
  );

  return response.data;
}

export interface ContractChangeInfo {
  cntrt_log_seq_no: number;
  upd_date: string;
  upd_time: string;
  cntrt_edit_comment: string;
  user_nm: string;
}
