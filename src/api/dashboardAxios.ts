import axios from "axios";
import { DashboardCalculateInfo } from "modules/dashboard/types";

export async function getDashboardCalculateInfoAxios() {
  // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.
  const response = await axios.get<DashboardCalculateInfo[]>(
    `http://3.37.155.50:8000/calculate/search?startDate=&endDate=&lspId=&dstConfYn=&vslCd=&transOrderNo=&cdVmeaning=`
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
