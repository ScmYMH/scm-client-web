import { RootState } from 'modules';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContractMemberAsync, getContractMemberAsync, postUserMemberAsync } from 'modules/contractMember/actions';
import { Table } from 'reactstrap';
import MenuBar from './MenuBar';
import Header from './header/Header';

const CommonInfoList = () => {
	const { data } = useSelector((state: RootState) => state.contractmember.contractMemberList);
	const [isAdd, setIsAdd] = useState<any[]>([]);
	const [addMember, setAddMember] = useState<any>([]);
	const [delMember, setDelMem] = useState<any>('');
	let temp = '';

	const dispatch = useDispatch();
	const onSubmitMemberInfo = (loginId: any, userNm: any, delYn: any) => {
		const params = {
			loginId: loginId,
			userNm: userNm,
			delYn: delYn,
		};

		dispatch(getContractMemberAsync.request(params));
	};

	const onChangeManagerCheckBox = (delMember: any) => {
		temp = delMember;
	};

	const onSubmitMemberDelete = () => {
		if (temp.length == 0) {
			alert('삭제할 계약담당자를 선택해주세요');
		} else {
			dispatch(deleteContractMemberAsync.request(temp));
			alert('성공적으로 삭제되었습니다!');
			onSubmitMemberInfo('', '', '');
		}
	};

	return (
		<>
			<Header></Header>
			<div className="AllMenu">
				<MenuBar
					onSubmitMemberInfo={onSubmitMemberInfo}
					addRow={() => setIsAdd([...addMember, {}])}
					delRow={() => {
						//const tmp = [...addMember];
						//addMember.pop();
						setIsAdd(addMember.pop());
					}}
					delRowForSearch={() => {
						const tmp = [...addMember];
						addMember.splice(0);
						setIsAdd(addMember);
					}}
					addMember={addMember}
					setAddMember={setAddMember}
					delMember={delMember}
					temp={temp}
					onSubmitMemberDelete={onSubmitMemberDelete}
				></MenuBar>
			</div>

			<Table bordered className="tableStyle">
				<thead>
					<tr className="table-secondary">
						<th></th>
						<th>사용자명</th>
						<th>로그인ID</th>
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
						<>
							{data.map((contractmemberInfo, index) => (
								<tr key={index} aria-rowcount={index}>
									<td>
										<input
											type={'checkbox'}
											id={contractmemberInfo.userId}
											onChange={() => onChangeManagerCheckBox(contractmemberInfo.userId)}
										></input>
									</td>
									<td key={contractmemberInfo.userId}>{contractmemberInfo.userNm}</td>
									<td key={contractmemberInfo.userId}>{contractmemberInfo.loginId}</td>
									<td key={contractmemberInfo.userId}>{contractmemberInfo.email}</td>
									<td className="textR" key={contractmemberInfo.userId}>
										{contractmemberInfo.employeeNumber}
									</td>
									<td key={contractmemberInfo.userId}>{contractmemberInfo.deptNm}</td>
									<td className="textR" key={contractmemberInfo.userId}>
										{contractmemberInfo.insDate}
									</td>
									<td className="textR" key={contractmemberInfo.userId}>
										{contractmemberInfo.updDate}
									</td>
									<td key={contractmemberInfo.userId}>{contractmemberInfo.delYn}</td>
								</tr>
							))}

							{/* {isAdd.map((i) => (
								<AddTable />
							))} */}

							{addMember.map((data, index) => (
								<tr key={index} aria-rowcount={index} className="table-secondary">
									<td>
										<input type={'checkbox'}></input>
									</td>
									<td key={data.userId}>{data.userNm}</td>
									<td key={data.userId}>{data.loginId}</td>
									<td key={data.userId}>{data.email}</td>
									<td className="textR" key={data.userId}>
										{data.employeeNumber}
									</td>
									<td key={data.userId}>{data.deptNm}</td>
									<td className="textR" key={data.userId}>
										{data.insDate}
									</td>
									<td className="textR" key={data.userId}>
										{data.updDate}
									</td>
									<td key={data.userId}>{data.delYn}</td>
								</tr>
							))}
						</>
					</tbody>
				)}
			</Table>
		</>
	);
};

export default CommonInfoList;
