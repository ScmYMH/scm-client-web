import axios from 'axios';

export async function getContractMemberList(loginId: string) {
	if (loginId == '') {
		const response = await axios.get<ContractMemberInfo>(`http://192.168.1.38:9091/contract/manager`);
		return response.data;
	} else {
		const response = await axios.get<ContractMemberInfo>(
			//`http://192.168.0.60:9091/contract/manager/name/${loginId}`,
			`http://192.168.1.38:9091/contract/manager/id/${loginId}`,
		);
		return response.data;
	}
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
