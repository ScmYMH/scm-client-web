import axios from "axios";

export async function getUserMemberList(params: any) {
  const response = await axios.get<UserMemberInfo>(
    `http://3.37.155.50:8000/contract/user/search?loginId=${params.loginId}&userNm=${params.userNm}`
  );

  return response.data;
}

export interface UserMemberInfo {
  userId: string;
  loginId: string;
  userNm: string;
  email: string;
  employeeNumber: string;
  deptNm: string;
}
