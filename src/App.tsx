import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommonInfoList from './components/contractMember/CommonInfoList';
import ChangeManagerLoader from 'components/changeManager/ChangeManagerLoader';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/contractMember" element={<CommonInfoList></CommonInfoList>}></Route>
					<Route path="/changeManager" element={<ChangeManagerLoader></ChangeManagerLoader>}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
