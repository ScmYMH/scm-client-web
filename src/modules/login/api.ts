import axios from 'axios';

export async function loginApi(loginId: string, loginPw: string) {
    // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.
    const response = await axios.post<LoginProfile>(
      `http://localhost:9000/user/login`,
        {
        "loginId": loginId,
        "loginPw": loginPw
        }
    );
   return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export interface LoginProfile {
    loginId: string;
    loginPw: string;
}