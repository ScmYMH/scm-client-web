import ChangeManagerScreen from 'components/changeManager/ChangeManagerScreen';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/changeManager" element={<ChangeManagerScreen></ChangeManagerScreen>}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
