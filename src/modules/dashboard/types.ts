import * as actions from "./actions";
import { AsyncState } from "lib/reducerUtils";
import { ActionType } from "typesafe-actions";

export type DashboardAction = ActionType<typeof actions>;

export type DashboardState = {
  dashboardCalculateInfo: AsyncState<DashboardCalculateInfo[], Error>;
};

export interface DashboardCalculateInfo {
  nation_nm: string; // 권역 이름
  close_no_yn: string; // 마감 번호 여부
  clear_amt: string; // 정산 금액
  acctg_yn: string; // 회계 연결 여부
  dst_conf_yn: string; // 담당자 확정 여부
  lsp_id: string;
  cd_v_meaning: string;
  vsl_cd: string;
  vsl_nm: string;
  trans_order_no: string;
  clear_curr: string;
  clear_qty: string;
  acctg_amt: string;
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
}
