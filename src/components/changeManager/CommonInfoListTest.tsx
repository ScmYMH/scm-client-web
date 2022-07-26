import { RootState } from 'modules';
import { getContractListAsync } from 'modules/changeManager/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommonInfoListTest = () => {
	const { data: dataList, loading, error } = useSelector((state: RootState) => state.changeManager.commonInfoList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getContractListAsync.request('202207130004'));
	}, []);

	return (
		<>
			{loading && <p style={{ textAlign: 'center' }}> 로딩중..</p>}
			{error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
			{dataList && (
				<div>
					{dataList.map((commonInfo, index) => (
						<div key={index}>
							<p>{index}번째</p>
							<div key={commonInfo.seqNo}>{commonInfo.cntrtTcd}</div>
							<div key={commonInfo.seqNo}>{commonInfo.cntrtNm}</div>
							<div key={commonInfo.seqNo}>{commonInfo.cntrtScd}</div>
							<div key={commonInfo.seqNo}>{commonInfo.crePersonId}</div>
							<div key={commonInfo.seqNo}>{commonInfo.cntrtStartDate}</div>
							<div key={commonInfo.seqNo}>{commonInfo.cntrtEndDate}</div>
							<div key={commonInfo.seqNo}>{commonInfo.cntrtCurrCd}</div>
							<div key={commonInfo.seqNo}>{commonInfo.delYn}</div>
							<div key={commonInfo.seqNo}>{commonInfo.insDate}</div>
							<div key={commonInfo.seqNo}>{commonInfo.insTime}</div>
							<div key={commonInfo.seqNo}>{commonInfo.insPersonId}</div>
							<div key={commonInfo.seqNo}>{commonInfo.updDate}</div>
							<div key={commonInfo.seqNo}>{commonInfo.updTime}</div>
							<div key={commonInfo.seqNo}>{commonInfo.updPersonId}</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default CommonInfoListTest;
