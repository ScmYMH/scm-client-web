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
	const [checked, setChecked] = useState<any>([]);
	let temp = '';
	let check = '';

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
		//upcheck = delMember;
	};

	const onPostManagerCheckBox = (addMember: any) => {
		console.log('temp 길이', check.length);
		console.log('temp 길이', check.length);
		check = addMember;
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
				checked={() => setChecked(!checked)}
				check={check}
			></MenuBar>

			<Table bordered style={{ width: 1600, margin: ' 0 auto', marginTop: 150, marginBottom: 50 }}>
				<thead>
					<tr className="table-secondary">
						<th></th>
						<th>사용자명</th>
						<th>로그인ID</th>
						<th>EMAIL</th>
						<th>직번</th>
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
									<td style={{ textAlign: 'right' }} key={contractmemberInfo.userId}>
										{contractmemberInfo.employeeNumber}
									</td>
									<td key={contractmemberInfo.userId}>{contractmemberInfo.deptNm}</td>
									<td style={{ textAlign: 'right' }} key={contractmemberInfo.userId}>
										{contractmemberInfo.insDate}
									</td>
									<td style={{ textAlign: 'right' }} key={contractmemberInfo.userId}>
										{contractmemberInfo.updDate}
									</td>
									<td key={contractmemberInfo.userId}>{contractmemberInfo.delYn}</td>
								</tr>
							))}

							{/* {isAdd.map((i) => (
								<AddTable />
							))} */}

							{addMember.map((data, index) => (
								<tr key={index} aria-rowcount={index}>
									<td>
										<input
											type={'checkbox'}
											onChange={() => onPostManagerCheckBox(addMember.userid)}
										></input>
									</td>
									<td key={data.userId}>{data.userNm}</td>
									<td key={data.userId}>{data.loginId}</td>
									<td key={data.userId}>{data.email}</td>
									<td style={{ textAlign: 'right' }} key={data.userId}>
										{data.employeeNumber}
									</td>
									<td key={data.userId}>{data.deptNm}</td>
									<td style={{ textAlign: 'right' }} key={data.userId}>
										{data.insDate}
									</td>
									<td style={{ textAlign: 'right' }} key={data.userId}>
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
