import React from 'react';
import { screen } from '@testing-library/react';
import { applyMiddleware } from 'redux';
import './Header.css';

const Header = () => {
	return (
		<div>
			<header>
				<img src="../../images/posco_ict_log.png" className="logo"></img>
			</header>
		</div>
	);
};

export default Header;
