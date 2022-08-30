import axios from "axios";

// export async function postContractMemberList(params: any[]) {
//   let postData: any = [];
//   postData = params;
//   const paramsData = `{
// 		"data":
// 			${JSON.stringify(postData)}

// 	}`;

//   const response = await axios.post<Array<ContractMemberInfo>>(
//     `http://localhost:9091/contract/manager/`,
//     JSON.parse(paramsData)
//   );
//   return response.data;
// }

export async function postExcelImport(params: any[]) {
  let postData: any = [];
  postData = params;
  const paramsData = `{
    "data":
      ${JSON.stringify(postData)}
  }`;

  console.log("params 확인 >>> ", params);
  const response = await axios.post<Array<ExcelImportData>>(
    `http://192.168.0.61:9999/excel`,
    JSON.parse(paramsData)
  );
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
  del_yn: String;
  arr_cd: String;
  lcc_Cd: String;
  sub_lcc_cd: String;
  cntrt_curr_cd: String;
  pay_curr_cd: String;
  prod_gcd: String;
  trff_stat_date: String;
}