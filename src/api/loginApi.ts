import axios from "axios";

export async function loginApi(params: string) {
  // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.
  const response = await axios.post<LoginInfo>(
    `http://3.37.155.50:8000/user/login`,
    params
  );
  console.log(response.data);
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

// response type 정의
export interface LoginInfo {
  userNm: string;
  params: string;
  loginId: string;
  loginPw: string;
  token: string;
  userId: string;
}
