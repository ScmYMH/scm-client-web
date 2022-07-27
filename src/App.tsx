import ChangeManagerScreen from 'components/changeManager/ChangeManagerScreen';
import React from 'react';
import Header from 'components/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommonInfoList from './components/ContractMember/CommonInfoList';

function App() {
	return (
		<div className="App">
			<Header></Header>
			<CommonInfoList></CommonInfoList>
			<BrowserRouter>
				<Routes>
					<Route path="/changeManager" element={<ChangeManagerScreen></ChangeManagerScreen>}></Route>
				</Routes>
			</BrowserRouter>

			{/* <BrowserRouter>
					<Routes>
						<Route path="/ContractMember" element={<CommonInfoList></CommonInfoList>}></Route>
					</Routes>
				</BrowserRouter> */}
		</div>
	);
}

export default App;
