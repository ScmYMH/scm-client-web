import React, { useEffect, useState } from 'react';
import './ChangeManagerScreen.css';
import { Button, Col, Input, Label, Table } from 'reactstrap';
import { getContractListAsync, postCntrtChgInfoAsync } from 'modules/changeManager/actions';
import { RootState } from 'modules';
import { CntrtChangeInfoConfirm, ManagerChangeInfo } from 'modules/changeManager/types';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import SearchManager from './SearchManager';

const ChangeManagerScreen = () => {
	const dispatch = useDispatch();

	const {
		data: commonInfoListData,
		loading: commonInfoListLoading,
		error: commonInfoListError,
	} = useSelector((state: RootState) => state.changeManager.commonInfoList);

	const {
		data: cntrtChangeInfoListData,
		loading: cntrtChangeInfoListLoading,
		error: cntrtChangeInfoListError,
	} = useSelector((state: RootState) => state.changeManager.cntrtChangeInfoList);

	const [preActorNm, setPreActorNm] = useState('');
	const [aftActorNm, setAftActorNm] = useState('');

	const [isCurrent, setIsCurrent] = useState(true); // true면 현 담당자, false면 인수 담당자

	const [mngChgInfo, setMngChgInfo] = useState<ManagerChangeInfo>({
		cntrtId: [],
		preActorId: '',
		aftActorId: '',
		validDate: '',
		reasonDesc: '',
	});

	const [cntrtIdArray, setCntrtIdArray] = useState<CntrtChangeInfoConfirm>({
		cntrtId: [],
		cntrtChangeInfoList: cntrtChangeInfoListData,
	});

	const [date, setDate] = useState(new Date());

	const [openModal, setOpenModal] = useState(false);

	const dateToString = (date) => {
		return (
			date.getFullYear() +
			(date.getMonth() + 1).toString().padStart(2, '0') +
			date.getDate().toString().padStart(2, '0')
		);
	};

	const onClickMember = (memId: string, memNm: string) => {
		console.log('memId: ', memId, ' memNm: ', memNm);
		if (isCurrent) {
			// 현 담당자인 경우
			setPreActorNm(memNm);
			setMngChgInfo({ ...mngChgInfo, preActorId: memId });
		} else {
			// 인수 담당자인 경우
			if (memNm === preActorNm) {
				alert('현 담당자와 같습니다. 다시 선택해 주십시오.');
			} else {
				setAftActorNm(memNm);
				setMngChgInfo({ ...mngChgInfo, aftActorId: memId });
			}
		}
		console.log('mngChgInfo: ', mngChgInfo);
	};

	const onChangeCommonInfoCheckBox = (e: React.ChangeEvent<HTMLInputElement>, paramCntrtId: string) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			const newCntrtId = [...mngChgInfo.cntrtId, paramCntrtId];
			console.log('newCntrtId: ', newCntrtId);

			setMngChgInfo({
				...mngChgInfo,
				cntrtId: newCntrtId,
			});
		} else {
			console.log('false', isChecked);
			const index = mngChgInfo.cntrtId.indexOf(paramCntrtId);
			// console.log('index: ', index);
			mngChgInfo.cntrtId.splice(index, 1);
			setMngChgInfo({
				...mngChgInfo,
				cntrtId: mngChgInfo.cntrtId,
			});
		}
	};

	const onChangeCntrtChagneInfoCheckBox = (e: React.ChangeEvent<HTMLInputElement>, paramCntrtId: string) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			const newCntrtId = [...cntrtIdArray.cntrtId, paramCntrtId];
			console.log('newCntrtId: ', newCntrtId);
			setCntrtIdArray({ ...cntrtIdArray, cntrtId: newCntrtId });
		} else {
			console.log('false', isChecked);
			const index = cntrtIdArray.cntrtId.indexOf(paramCntrtId);
			// console.log('index: ', index);
			cntrtIdArray.cntrtId.splice(index, 1);
			setCntrtIdArray({ ...cntrtIdArray, cntrtId: cntrtIdArray.cntrtId });
		}
	};

	const onChangeValidDate = (date: Date) => {
		setDate(date);
		setMngChgInfo({
			...mngChgInfo,
			validDate: dateToString(date),
		});
		console.log('date : ', dateToString(date));
	};

	const onClickApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (mngChgInfo.preActorId === '') {
			alert('현 담당자를 선택해주세요');
		} else if (mngChgInfo.aftActorId === '') {
			alert('인수 담당자를 선택해주세요');
		} else if (mngChgInfo.validDate === '') {
			alert('변경 유효 일자를 선택해주세요');
		} else if (mngChgInfo.reasonDesc === '') {
			alert('변경 사유를 입력하세요');
		} else {
			dispatch(postCntrtChgInfoAsync.request(mngChgInfo));
		}
	};

	useEffect(() => {
		if (mngChgInfo.preActorId !== '') dispatch(getContractListAsync.request(mngChgInfo.preActorId));
	}, [mngChgInfo.preActorId]);

	return (
		<div style={{ margin: 30 }}>
			<div style={{ margin: 10 }}>
				<span style={{ marginRight: 10 }}>현 담당자</span>
				<input type="text" value={preActorNm} onChange={(e) => setPreActorNm(e.target.value)}></input>
				<Button
					className="btn"
					size="sm"
					onClick={() => {
						setOpenModal((openModal) => !openModal);
						setIsCurrent(true);
					}}
				>
					조회
				</Button>
				{openModal && (
					<SearchManager
						onClickMember={onClickMember}
						isOpen={openModal}
						closeModal={() => setOpenModal((openModal) => !openModal)}
					/>
				)}
				<span style={{ marginRight: 10 }}>인수 담당자</span>
				<input type="text" value={aftActorNm} onChange={(e) => setAftActorNm(e.target.value)}></input>
				<Button
					className="btn"
					size="sm"
					onClick={() => {
						setOpenModal((openModal) => !openModal);
						setIsCurrent(false);
					}}
				>
					조회
				</Button>
				{openModal && (
					<SearchManager
						onClickMember={onClickMember}
						isOpen={openModal}
						closeModal={() => setOpenModal((openModal) => !openModal)}
					/>
				)}
			</div>
			<div style={{ display: 'flex', margin: 10, alignContent: 'center' }}>
				<span>변경 발효 일자</span>
				<DatePicker
					style={{ display: 'span' }}
					flexedHeight
					dateFormat="yyyy-MM-dd"
					selected={date}
					minDate={new Date()}
					onChange={(date: Date) => onChangeValidDate(date)}
				/>
			</div>
			<div style={{ display: 'flex', margin: 10, marginTop: 20, marginBottom: 20 }}>
				<Label for="reasonDesc" sm={2}>
					변경 사유
				</Label>
				<Col sm={10}>
					<Input
						id="reasonDesc"
						name="textarea"
						type="textarea"
						onChange={(e) => setMngChgInfo({ ...mngChgInfo, reasonDesc: e.target.value })}
					/>
				</Col>
			</div>

			<div
				style={{
					margin: '10px',
					marginTop: '30px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div>대상계약리스트</div>
				<Button
					size="sm"
					onClick={(e) => {
						onClickApply(e);
					}}
				>
					적용
				</Button>
			</div>
			<Table bordered>
				<thead style={{ textAlign: 'center' }}>
					<tr>
						<th></th>
						<th>계약 ID</th>
						<th>계약명</th>
						<th>계약상태</th>
						<th>계약 시작</th>
						<th>계약 종료</th>
					</tr>
				</thead>
				<tbody>
					{commonInfoListData?.map((commonInfo, index) => (
						<tr key={index}>
							<th scope="row">
								<Input
									type="checkbox"
									onChange={(e) => onChangeCommonInfoCheckBox(e, commonInfo.cntrtId)}
								/>
							</th>
							<td style={{ padding: 30 }}>{commonInfo.cntrtId}</td>
							<td style={{ padding: 30 }}>{commonInfo.cntrtNm}</td>
							<td style={{ padding: 30 }}>{commonInfo.cntrtScd}</td>
							<td style={{ padding: 30 }}>
								{commonInfo.cntrtStartDate.slice(0, 4) +
									'-' +
									commonInfo.cntrtStartDate.slice(4, 6) +
									'-' +
									commonInfo.cntrtStartDate.slice(6)}
							</td>
							<td style={{ padding: 30 }}>
								{commonInfo.cntrtEndDate.slice(0, 4) +
									'-' +
									commonInfo.cntrtEndDate.slice(4, 6) +
									'-' +
									commonInfo.cntrtEndDate.slice(6)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<div>재할당 계약</div>
				<div>
					<Button size="sm">확정</Button>
					<Button size="sm">취소</Button>
				</div>
			</div>
			<Table bordered>
				<thead style={{ textAlign: 'center' }}>
					<tr>
						<th></th>
						<th>계약 ID</th>
						<th>계약명</th>
						<th>현담당자</th>
						<th>인수담당자</th>
						<th>변경발효일자</th>
						<th>변경확정여부</th>
						<th>변경사유</th>
					</tr>
				</thead>
				<tbody>
					{cntrtChangeInfoListData?.map((cntrtChangeInfo, index) => (
						<tr key={index}>
							<th scope="row">
								<Input
									type="checkbox"
									onChange={(e) => onChangeCntrtChagneInfoCheckBox(e, cntrtChangeInfo.cntrtId)}
								/>
							</th>
							<td style={{ padding: 30 }}>{cntrtChangeInfo.cntrtId}</td>
							<td style={{ padding: 30 }}>{cntrtChangeInfo.cntrtNm}</td>
							<td style={{ padding: 30 }}>{cntrtChangeInfo.preActorNm}</td>
							<td style={{ padding: 30 }}>{cntrtChangeInfo.aftActorNm}</td>
							<td style={{ padding: 30 }}>
								{cntrtChangeInfo.validDate.slice(0, 4) +
									'-' +
									cntrtChangeInfo.validDate.slice(4, 6) +
									'-' +
									cntrtChangeInfo.validDate.slice(6)}
							</td>
							<td style={{ padding: 30 }}>{cntrtChangeInfo.cmptYn}</td>
							<td style={{ padding: 30 }}>{cntrtChangeInfo.reasonDesc}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default ChangeManagerScreen;
