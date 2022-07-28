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
							<div>{commonInfo.cntrtNm}</div>
							<div>{commonInfo.cntrtScd}</div>
							<div>{commonInfo.cntrtStartDate}</div>
							<div>{commonInfo.cntrtEndDate}</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default CommonInfoListTest;
