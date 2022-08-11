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
  const response = await axios.post<Array<ExcelImportData>>(
    `http://localhost:9092/contract/tariff/excel/import/`,
    params
  );
  return response.data;
}

export interface ExcelImportData {
  trff_nm: string;
  trff_desc: string;
  biz_nm: string;
  svc_nm: string;
  detl_svc_nm: string;
  ins_date: string;
}
