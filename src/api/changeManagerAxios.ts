import axios from 'axios';

export async function getContractList(crePersonId: string) {
	const response = await axios.get<CommonInfo>(`http://localhost:9091/contract/manager/cntrtlist/${crePersonId}`);
	return response.data;
}

export interface CommonInfo {
	cntrtId: string; //계약 ID
	cntrtTcd: string; // 계약 유형코드
	cntrtNm: string; // 계약 명
	cntrtScd: string; // 계약 상태코드
	crePersonId: string; // 계약 담당자 ID
	cntrtStatDate: string; // 계약 시작 일
	cntrtEndDate: string; // 계약 종료 일
	cntrtCurrCd: string; // 계약 통화 코드
	delYn: string; // 삭제여부
	insDate: string; // 입력일자
	insTime: string; // 입력시간
	insPersonId: string; // 입력자ID
	updDate: string; // 수정일자
	updTime: string; // 수정시간
	updPersonId: string; // 수정자ID
}
