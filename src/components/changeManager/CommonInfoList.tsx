import { RootState } from 'modules';
import { getContractListAsync } from 'modules/changeManager/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommonInfoList = () => {
	const { data, loading, error } = useSelector((state: RootState) => state.changeManager.commonInfoList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getContractListAsync.request('202207130004'));
	}, []);

	return (
		<>
			{loading && <p style={{ textAlign: 'center' }}> 로딩중..</p>}
			{error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
			{data && (
				<div>
					{data.map((commonInfo, index) => (
						<div key={index}>
							<p>{index}번째</p>
							<div key={commonInfo.cntrtId}>{commonInfo.cntrtTcd}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.cntrtNm}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.cntrtScd}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.crePersonId}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.cntrtStatDate}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.cntrtEndDate}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.cntrtCurrCd}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.delYn}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.insDate}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.insTime}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.insPersonId}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.updDate}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.updTime}</div>
							<div key={commonInfo.cntrtId}>{commonInfo.updPersonId}</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default CommonInfoList;
