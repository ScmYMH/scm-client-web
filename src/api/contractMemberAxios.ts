import axios from 'axios';

export async function getContractMemberList(params: any) {
	console.log('-------------', params);
	const response = await axios.get<ContractMemberInfo>(
		`http://localhost:9091/contract/manager/search?loginId=${params.loginId}&userNm=${params.userNm}&delYn=${params.delYn}`,
	);

	console.log('-------------', response.data);

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
