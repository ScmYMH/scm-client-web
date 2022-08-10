import { RootState } from 'modules';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContractMemberAsync, getContractMemberAsync, postUserMemberAsync } from 'modules/contractMember/actions';
import { Table, Button } from 'reactstrap';
import MenuBar from './MenuBar';
import Header from './header/Header';
import { writeXLSX } from 'xlsx';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const CommonInfoList = () => {
	const { data } = useSelector((state: RootState) => state.contractmember.contractMemberList);
	const [isAdd, setIsAdd] = useState<any[]>([]);
	const [addMember, setAddMember] = useState<any>([]);
	const [delMember, setDelMem] = useState<any>('');
	const [checked, setChecked] = useState(false);
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

	///엑셀 구현///
	// const exportData = [
	// 	{
	// 		userId: '202207130003',
	// 		loginId: 'ghi06141',
	// 		userNm: '홍혜정',
	// 		email: 'ghi06141@naver.com',
	// 		employeeNumber: '14789',
	// 		deptNm: '국내물류계약섹션',
	// 		delYn: 'N',
	// 		insDate: '20220803',
	// 		updDate: null,
	// 	},
	// 	{
	// 		userId: '202207130005',
	// 		loginId: 'rkatkgody',
	// 		userNm: '박다솔',
	// 		email: 'thank@gmail.com',
	// 		employeeNumber: '96632',
	// 		deptNm: '국내물류계약섹션',
	// 		delYn: 'N',
	// 		insDate: '20220803',
	// 		updDate: null,
	// 	},
	// 	{
	// 		userId: '20453693456896',
	// 		loginId: 'zdfs96',
	// 		userNm: '홍정혜',
	// 		email: 'awcef@naver.com',
	// 		employeeNumber: '96596',
	// 		deptNm: '해외물류계약색션',
	// 		delYn: 'Y',
	// 		insDate: '20220729',
	// 		updDate: '20220731',
	// 	},
	// ];

	const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const excelFileExtension = '.xlsx';
	const excelFileName = '작성자';

	const excelDownload = (excelData: any) => {
		const ws = XLSX.utils.aoa_to_sheet([
			['로그인ID', '사용자이름', '이메일', '직번', '부서', '삭제여부', '등록일', '삭제일'],
		]);
		excelData.map((exportData: any) => {
			XLSX.utils.sheet_add_aoa(
				ws,
				[
					[
						exportData.loginId,
						exportData.userNm,
						exportData.email,
						exportData.employeeNumber,
						exportData.deptNm,
						exportData.delYn,
						exportData.insDate,
						exportData.updDate,
					],
				],
				{ origin: -1 },
			);
			ws['!cols'] = [{ wpx: 200 }, { wpx: 200 }];
			return false;
		});
		const wb: any = { Sheets: { data: ws }, SheetNames: ['data'] };
		const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const excelFile = new Blob([excelButter], { type: excelFileType });
		FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
	};

	return (
		<>
			<Header></Header>
			<MenuBar
				onSubmitMemberInfo={onSubmitMemberInfo}
				addRow={() => setIsAdd([...addMember, {}])}
				delRow={() => {
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
				checked={checked}
			></MenuBar>

			<button onClick={() => excelDownload(data)}>엑셀 다운로드</button>
			<Table
				bordered
				style={{ width: 1600, margin: ' 0 auto', marginTop: 150, marginBottom: 50 }}
				cellSpacing={0}
				id="tableData"
			>
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
										<input type={'checkbox'} onChange={() => setChecked(true)}></input>
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
