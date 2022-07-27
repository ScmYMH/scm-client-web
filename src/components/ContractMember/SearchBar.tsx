import React from 'react';
import { Button } from 'react-bootstrap';

const SearchBar = () => {
	return (
		<>
			<div className="row">
				<div className="row">사용자명</div>
				<input className="sInput"></input>
				<Button className="sButton">조회</Button>

				<div className="row">로그인 ID</div>
				<input className="sInput"></input>
				<Button className="sButton">조회</Button>

				<div className="row">삭제여부</div>
			</div>
		</>
	);
};

export default SearchBar;
