import React, { useEffect, useState } from 'react';
import './ChangeManagerScreen.css';
import { Button, Col, FormGroup, Input, Label, Table } from 'reactstrap';
import { getContractListAsync } from 'modules/changeManager/actions';
import { RootState } from 'modules';
import { ManagerChangeInfo } from 'modules/changeManager/types';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';

const ChangeManagerScreen = () => {
	const [startDate, setStartDate] = useState(new Date());
	const {
		data: commonInfoListData,
		loading: commonInfoListLoading,
		error: commonInfoListError,
	} = useSelector((state: RootState) => state.changeManager.commonInfoList);
	const dispatch = useDispatch();

	const [mngChgInfo, setMngChgInfo] = useState<ManagerChangeInfo>({
		cntrtId: [],
		preActorId: '',
		aftActorId: '',
		validDate: '',
		reasonDesc: '',
	});

	console.log('날짜 : ', startDate);

	useEffect(() => {
		dispatch(getContractListAsync.request('202207130004'));
	}, []);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>, paramCntrtId: string) => {
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

	const onClickApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setMngChgInfo({
			...mngChgInfo,
		});
	};

	return (
		<>
			<div>
				<div>현 담당자</div>
				<input type="text"></input>
				<Button className="btn">조회</Button>
			</div>
			<div>
				<div className="row">인수 담당자</div>
				<input type="text"></input>
				<Button className="btn">조회</Button>
			</div>
			<div>
				<div>변경 발효 일자</div>
				<DatePicker fixedHeight selected={startDate} onChange={(date: Date) => setStartDate(date)} />
			</div>
			<div className="row">
				<FormGroup row>
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
				</FormGroup>
			</div>
			<div style={{ margin: 30, display: 'flex', justifyContent: 'space-between' }}>
				<div>대상계약리스트</div>
				<Button
					onClick={(e) => {
						onClickApply(e);
					}}
				>
					적용
				</Button>
			</div>
			<Table style={{ marginLeft: 30 }} bordered>
				<thead>
					<th>#</th>
					<th>계약 ID</th>
					<th>계약명</th>
					<th>계약상태</th>
					<th>계약 시작</th>
					<th>계약 종료</th>
				</thead>
				<tbody>
					{commonInfoListData?.map((commonInfo, index) => (
						<tr key={index}>
							<th scope="row">
								<Input type="checkbox" onChange={(e) => onChange(e, commonInfo.cntrtId)} />
							</th>
							<td key={commonInfo.seqNo} style={{ padding: 30 }}>
								{commonInfo.cntrtId}
							</td>
							<td key={commonInfo.seqNo} style={{ padding: 30 }}>
								{commonInfo.cntrtNm}
							</td>
							<td key={commonInfo.seqNo} style={{ padding: 30 }}>
								{commonInfo.cntrtCurrCd}
							</td>
							<td key={commonInfo.seqNo} style={{ padding: 30 }}>
								{commonInfo.cntrtStartDate.slice(0, 4) +
									'-' +
									commonInfo.cntrtStartDate.slice(4, 6) +
									'-' +
									commonInfo.cntrtStartDate.slice(6)}
							</td>
							<td key={commonInfo.seqNo} style={{ padding: 30 }}>
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

			<div style={{ margin: 30, display: 'flex', justifyContent: 'space-between' }}>
				<div>재할당 계약</div>
				<div>
					<Button>확정</Button>
					<Button>취소</Button>
				</div>
			</div>
			<Table style={{ marginLeft: 30 }}>
				<thead>
					<th></th>
					<th>계약 ID</th>
					<th>계약명</th>
					<th>현담당자</th>
					<th>인수담당자</th>
					<th>변경발효일자</th>
					<th>변경확정여부</th>
					<th>변경사유</th>
				</thead>
				<tbody>
					<tr>
						<th scope="row">
							<Input type="checkbox" />
						</th>
						<td style={{ padding: 30 }}>20220301000003</td>
						<td style={{ padding: 30 }}>22년 3월 미주 수출 COA계약</td>
						<td style={{ padding: 30 }}>김민호</td>
						<td style={{ padding: 30 }}>임아연</td>
						<td style={{ padding: 30 }}>2022-07-15</td>
						<td style={{ padding: 30 }}>미확정</td>
						<td style={{ padding: 30 }}>업무이관 및 계약부서 담당자 변경으로 인한 업무 인계</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

export default ChangeManagerScreen;
