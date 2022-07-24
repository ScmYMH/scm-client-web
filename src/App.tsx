import CommonInfoList from 'components/changeManager/CommonInfoList';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<BrowserRouter>
					<Routes>
						<Route path="/changeManager" element={<CommonInfoList></CommonInfoList>}></Route>
					</Routes>
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
