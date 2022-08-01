import { RootState } from 'modules';
import { getContractMemberAsync } from 'modules/contractMember/actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';

const SearchManager = ({
	isOpen,
	closeModal,
	onClickMember,
	preActorNm,
	aftActorNm,
	isCurrent,
}: {
	isOpen: boolean;
	closeModal: any;
	onClickMember: any;
	preActorNm: string;
	aftActorNm: string;
	isCurrent: boolean;
}) => {
	return (
		<Modal isOpen={isOpen} toggle={closeModal} size="xl">
			<ModalHeader toggle={closeModal}>계약 담당자 조회</ModalHeader>
			<ModalBody>
				<SearchManagerBody
					onClickMember={onClickMember}
					closeModal={closeModal}
					preActorNm={preActorNm}
					aftActorNm={aftActorNm}
					isCurrent={isCurrent}
				/>
			</ModalBody>
		</Modal>
	);
};

const SearchManagerBody = ({
	onClickMember,
	closeModal,
	preActorNm,
	aftActorNm,
	isCurrent,
}: {
	onClickMember: any;
	closeModal: any;
	preActorNm: string;
	aftActorNm: string;
	isCurrent: boolean;
}) => {
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

	const onSelect = (memId: string, memNm: string) => {
		onClickMember(memId, memNm);
		closeModal();
	};

	useEffect(() => {
		if (isCurrent) {
			dispatch(getContractMemberAsync.request({ ...member, userNm: preActorNm }));
		} else {
			dispatch(getContractMemberAsync.request({ ...member, userNm: aftActorNm }));
		}
	}, []);

	return (
		<>
			<div style={{ display: 'inline-block', margin: '10px', verticalAlign: 'center' }}>
				<span style={{ marginRight: '10px' }}>사용자명</span>
				<input
					id="userNm"
					name="userNm"
					type="text"
					style={{ marginRight: '30px' }}
					onChange={(e) => setMember({ ...member, userNm: e.target.value })}
				></input>
				<span style={{ marginRight: '10px' }}>로그인ID</span>
				<input
					id="loginId"
					name="loginId"
					type="text"
					style={{ marginRight: '30px' }}
					onChange={(e) => setMember({ ...member, loginId: e.target.value })}
				></input>
				<span style={{ marginRight: '10px' }}>삭제여부</span>
				<select
					onChange={(e) => setMember({ ...member, delYn: e.target.value })}
					style={{ marginRight: '30px' }}
					id="delYn"
					name="delYn"
				>
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
						<th></th>
					</tr>
				</thead>
				{contractMemberListData && (
					<tbody>
						{contractMemberListData.map((contractmemberInfo, index) => (
							<tr key={index} aria-rowcount={index}>
								<td>{contractmemberInfo.loginId}</td>
								<td>{contractmemberInfo.userNm}</td>
								<td>{contractmemberInfo.email}</td>
								<td>{contractmemberInfo.employeeNumber}</td>
								<td>{contractmemberInfo.deptNm}</td>
								<td>{contractmemberInfo.insDate}</td>
								<td>{contractmemberInfo.updDate}</td>
								<td>{contractmemberInfo.delYn}</td>
								<td>
									<Button
										onClick={() => onSelect(contractmemberInfo.userId, contractmemberInfo.userNm)}
									>
										선택
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</Table>
		</>
	);
};

export default SearchManager;
