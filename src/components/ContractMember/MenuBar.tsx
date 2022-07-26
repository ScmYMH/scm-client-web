import React, { useEffect, useState, ChangeEvent, FormEvent, forwardRef } from 'react';

import CommonInfoList from './CommonInfoList';
import './ContractMember.css';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form } from 'reactstrap';
import AddTable from './AddTable';

interface memberProps {
	onSubmitMemberInfo: (loginId: string, userNm: string, delYn: string) => void;
}

const MenuBar = ({ onSubmitMemberInfo }: memberProps) => {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState('');
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);

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
		<div>
			<div className="buttonAllStyle">
				<Form
					// onClick={() => {
					// 	setVisible(!visible);
					// }}
					onSubmit={onSubmit}
					className="buttonStyle"
				>
					<Button type="submit" className="buttonStyle">
						조회
					</Button>
				</Form>
				<Button className="buttonStyle">등록</Button>
				<Button className="buttonStyle">행추가</Button>
				<Button className="buttonStyle">행삭제</Button>
				<Button className="buttonStyle">엑셀 EXPORT</Button>
				<Button className="buttonStyle">삭제</Button>
				<Button
					className="buttonStyle"
					// onClick={() => {
					// 	setVisible(!visible);
					// 	// useState(false);
					// }}
				>
					닫기
				</Button>
			</div>
			<div className="searcAll">
				<span className="margin">로그인ID</span>
				<input id="loginId" name="loginId" onChange={search}></input>
				<span className="margin">사용자명</span>
				<input id="userNm" name="userNm" type={'text'} onChange={search}></input>
				<span className="margin">삭제여부</span>
				<div onChange={search} className="margin">
					<select className="margin" value={selected} id="delYn" name="delYn">
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.text}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default MenuBar;
