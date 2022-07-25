import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import CommonInfoList from './CommonInfoList';
import './ContractMember.css';
import { getContractMemberAsync } from 'modules/contractMember/actions';
import { useDispatch } from 'react-redux';
import { loadingIndicatorCSS } from 'react-select/dist/declarations/src/components/indicators';

interface memberProps {
	onSubmitMemberInfo: (loginId: string, userNm: string, delYn: string) => void;
}

const MenuBar = ({ onSubmitMemberInfo }: memberProps) => {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState('');

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

	const [selected, setSelected] = useState(options[0].value);

	const search = (e: ChangeEvent<HTMLInputElement>) => {
		setMember({ ...member, [e.target.id]: e.target.value });
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmitMemberInfo(member.loginId, member.userNm, member.delYn);
	};

	return (
		<div className="buttonAllStyle">
			<div>
				<Form
					className="buttonAllStyle"
					// onClick={() => {
					// 	setVisible(!visible);
					// }}
					onSubmit={onSubmit}
				>
					<Button type="submit" className="buttonStyle">
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
				</Form>
			</div>
			<div>
				<div className="row">
					로그인ID: <input id="loginId" name="loginId" onChange={search}></input>
				</div>
				<div className="row">
					사용자명: <input id="userNm" name="userNm" type={'text'} onChange={search}></input>
				</div>
				<div className="row">
					삭제여부:
					<div className="row" onChange={search}>
						<select value={selected} id="delYn" name="delYn">
							{options.map((option) => (
								<option key={option.value} value={option.value}>
									{option.text}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{visible && <CommonInfoList></CommonInfoList>}
		</div>
	);
};

export default MenuBar;
