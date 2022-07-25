import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Row } from 'react-bootstrap';
import CommonInfoList from './CommonInfoList';
import './ContractMember.css';
import { getContractMemberAsync } from 'modules/contractMember/actions';
import { useDispatch } from 'react-redux';

const ContractMemberMenuBar = () => {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState('');
	useEffect(() => {
		dispatch(getContractMemberAsync.request(''));
	}, []);
	const search = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(getContractMemberAsync.request(e.target.value));
	};
	return (
		<div className="buttonAllStyle">
			<Button
				className="buttonStyle"
				onClick={() => {
					setVisible(!visible);
				}}
			>
				조회
			</Button>
			<Button className="buttonStyle">등록</Button>
			<Button className="buttonStyle">행추가</Button>
			<Button className="buttonStyle">행삭제</Button>
			<Button className="buttonStyle">엑셀 EXPORT</Button>
			<Button className="buttonStyle">삭제</Button>
			<Button
				className="buttonStyle"
				onClick={() => {
					setVisible(!visible);
					useState(false);
				}}
			>
				닫기
			</Button>

			<div>
				<div className="row">
					로그인ID: <input type={'text'} onChange={search}></input>
				</div>
				<div className="row">
					사용자명: <input type={'text'} onChange={search}></input>
				</div>
			</div>

			{visible && <CommonInfoList></CommonInfoList>}
		</div>
	);
};

export default ContractMemberMenuBar;
