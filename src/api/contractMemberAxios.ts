import axios from "axios";

export async function getContractMemberList(params: any) {
  const response = await axios.get<ContractMemberInfo>(
    `http://3.37.155.50:8000/contract/manager/search?loginId=${params.loginId}&userNm=${params.userNm}&delYn=${params.delYn}`
  );

  return response.data;
}

export async function postContractMemberList(params: any[]) {
  let postData: any = [];
  postData = params;
  const paramsData = `{
		"data": 
			${JSON.stringify(postData)}
		
	}`;

  const response = await axios.post<Array<ContractMemberInfo>>(
    `http://3.37.155.50:8000/contract/manager/`,
    JSON.parse(paramsData),
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return response.data;
}

export async function deleteContractMemberList(userId: any) {
  const response = await axios.delete<any>(
    `http://3.37.155.50:8000/contract/manager/${userId}`
  );
  return response.data;
}

export interface ContractMemberInfo {
  userId: string;
  loginId: string;
  userNm: string;
  email: string;
  employeeNumber: string;
  deptNm: string;
  delYn: string;
  insPersonId: string;
  insDate: string;
  insTime: string;
  updPersonId: string;
  updDate: string;
  updTime: string;
}
