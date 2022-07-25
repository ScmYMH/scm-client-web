import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from 'components/ContractMember/MenuBar';
import Header from 'components/header/Header';
import SearchBar from 'components/ContractMember/SearchBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContractMemberInfo } from 'api/contractMemberAxios';
import CommonInfoList from './components/ContractMember/CommonInfoList';

function App() {
	return (
		<div className="App">
			<Header></Header>
			<MenuBar></MenuBar>

			{/* <BrowserRouter>
					<Routes>
						<Route path="/ContractMember" element={<CommonInfoList></CommonInfoList>}></Route>
					</Routes>
				</BrowserRouter> */}
		</div>
	);
}

export default App;
