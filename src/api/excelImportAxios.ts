import axios from "axios";

export async function postExcelImport(params: any[]) {
  let postData: any = [];
  postData = params;
  const paramsData = `{
    "data":
      ${JSON.stringify(postData)}
  }`;
  console.log("postExcelImport 실행 ======> data : ", params);
  const response = await axios.post<Array<ExcelImportData>>(
    `http://3.37.155.50:8000/excel`,
    JSON.parse(paramsData)
  );
  console.log(response.data);
  return response.data;
}

export interface ExcelImportData {
  trff_stat_date: string;
  trff_end_date: string;
  dep_cd: string;
  dep_nm: string;
  arr_cd: string;
  arr_nm: string;
  lcc_cd: string;
  sub_lcc_cd: string;
  cntrt_curr_cd: string;
  pay_curr_cd: string;
  prod_gcd: string;
  unit_price: number;
  cal_unit_cd: string;
  lcc_cd_desc: string;
}

export interface ValidationCheckData {
  del_yn: string;
  arr_cd: string;
  lcc_Cd: string;
  sub_lcc_cd: string;
  cntrt_curr_cd: string;
  pay_curr_cd: string;
  prod_gcd: string;
  trff_stat_date: string;
}
