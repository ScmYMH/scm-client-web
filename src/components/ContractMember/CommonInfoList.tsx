import { RootState } from 'modules';
import React, { ChangeEvent, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContractMemberAsync } from 'modules/contractMember/actions';
import MenuBar from './MenuBar';
import { Table } from 'reactstrap';
import AddTable from './AddTable';

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
	};

	return (
		<>
			<MenuBar onSubmitMemberInfo={onSubmitMemberInfo}></MenuBar>

			<Table bordered className="tableStyle">
				<thead>
					<tr>
						<th></th>
						<th>로그인ID</th>
						<th>사용자명</th>
						<th>EMAIL</th>
						<th>EMPLOYEE_NUMBER</th>
						<th>부서</th>
						<th>등록일</th>
						<th>삭제일</th>
						<th>삭제여부</th>
					</tr>
				</thead>
				{data && (
					<tbody>
						{data.map((contractmemberInfo, index) => (
							<tr key={index} aria-rowcount={index}>
								<td>
									<input type={'checkbox'}></input>
								</td>

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

						{/* <AddTable></AddTable> */}
					</tbody>
				)}
			</Table>
		</>
	);
};

export default CommonInfoList;
