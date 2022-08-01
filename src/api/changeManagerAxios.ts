import axios from 'axios';
import { CntrtChangeInfo, CommonInfo, ManagerChangeInfo } from 'modules/changeManager/types';

export async function getContractList(crePersonId: string) {
	const response = await axios.get<Array<CommonInfo>>(
		`http://localhost:9091/contract/manager/cntrtlist/${crePersonId}`,
	);
	return response.data;
}

export async function postCntrtChgInfo(managerChangeInfo: ManagerChangeInfo) {
	const response = await axios.post<Array<CntrtChangeInfo>>(
		`http://localhost:9091/contract/manager/chginfo`,
		managerChangeInfo,
	);
	return response.data;
}

export async function putCntrtChgInfo(seqNoArray: number[]) {
	const response = await axios.put<boolean>(`http://localhost:9091/contract/manager/chginfo`, seqNoArray);
	return response.data;
}

export async function delCntrtChgInfo(seqNoParam: string) {
	const response = await axios.delete<boolean>(`http://localhost:9091/contract/manager/chginfo/${seqNoParam}`);
	return response.data;
}
