import { RootState } from 'modules';
import React, { ChangeEvent, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContractMemberAsync } from 'modules/contractMember/actions';
import MenuBar from './MenuBar';

const CommonInfoList = () => {
	const { data, loading, error } = useSelector((state: RootState) => state.contractmember.contractMemberList);
	const dispatch = useDispatch();
	const onSubmitMemberInfo = (loginId: any, userNm: any, delYn: any) => {
		const params = {
			loginId: loginId,
			userNm: userNm,
			delYn: delYn,
		};
		dispatch(getContractMemberAsync.request(params));
		console.log('사가로 가는중 ');
	};
	return (
		<>
			<MenuBar onSubmitMemberInfo={onSubmitMemberInfo}></MenuBar>
			<table className="tableStyle">
				{data && (
					<tbody>
						<th>로그인ID</th>
						<th>사용자명</th>
						<th>EMAIL</th>
						<th>EMPLOYEE_NUMBER</th>
						<th>부서</th>
						<th>등록일</th>
						<th>삭제일</th>
						<th>삭제여부</th>
						{data.map((contractmemberInfo, index) => (
							<tr key={index} aria-rowcount={index}>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.loginId}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.userNm}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.email}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.employeeNumber}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.deptNm}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.insDate}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.updDate}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.delYn}</td>
							</tr>
						))}
					</tbody>
				)}
			</table>
		</>
	);
};

export default CommonInfoList;
