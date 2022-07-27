import { RootState } from 'modules';
import { getContractMemberAsync } from 'modules/contractMember/actions';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';

const SearchManager = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: any }) => {
	return (
		<Modal isOpen={isOpen} toggle={closeModal} size="xl">
			<ModalHeader toggle={closeModal}>계약 담당자 조회</ModalHeader>
			<ModalBody>
				<SearchManagerBody />
			</ModalBody>
		</Modal>
	);
};

const SearchManagerBody = () => {
	const dispatch = useDispatch();

	const {
		data: contractMemberListData,
		loading: contractMemberListLoading,
		error: contractMemberListError,
	} = useSelector((state: RootState) => state.contractmember.contractMemberList);

	const [member, setMember] = useState({
		loginId: '',
		userNm: '',
		delYn: '',
	});

	const options = [
		{ value: '', text: 'ALL' },
		{ value: 'N', text: 'N' },
		{ value: 'Y', text: 'Y' },
	];

	const onSubmitMemberInfo = () => {
		dispatch(getContractMemberAsync.request(member));
	};

	return (
		<>
			<div style={{ display: 'inline-block', margin: '10px', verticalAlign: 'center' }}>
				<span style={{ marginRight: '10px' }}>로그인ID</span>
				<input
					id="loginId"
					name="loginId"
					type="text"
					style={{ marginRight: '30px' }}
					onChange={(e) => setMember({ ...member, loginId: e.target.value })}
				></input>
				<span style={{ marginRight: '10px' }}>사용자명</span>
				<input
					id="userNm"
					name="userNm"
					type="text"
					style={{ marginRight: '30px' }}
					onChange={(e) => setMember({ ...member, userNm: e.target.value })}
				></input>
				<span style={{ marginRight: '10px' }}>삭제여부</span>
				<select style={{ marginRight: '30px' }} id="delYn" name="delYn">
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					))}
				</select>
				<Button className="btn" size="sm" onClick={onSubmitMemberInfo}>
					조회
				</Button>
			</div>
			<Table bordered className="tableStyle">
				<thead>
					<tr>
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
				{contractMemberListData && (
					<tbody>
						{contractMemberListData.map((contractmemberInfo, index) => (
							<tr key={index} aria-rowcount={index}>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.loginId}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.userNm}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.email}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.employeeNumber}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.deptNm}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.insDate}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.updDate}</td>
								<td key={contractmemberInfo.loginId}>{contractmemberInfo.delYn}</td>
								<Button>선택</Button>
							</tr>
						))}
					</tbody>
				)}
			</Table>
		</>
	);
};

export default SearchManager;
