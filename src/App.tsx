import React from "react";
import Header from "components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContractCoaInfoLoader from "components/contractCoa/ContractCoaInfoLoader";
import LoginLoader from "./components/login/LoginLoader";
import CommonInfoList from "components/ContractMember/CommonInfoList";
import ChangeManagerLoader from "components/changeManager/ChangeManagerLoader";
import TariffLoader from "components/tariffInfo/TariffLoader";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ContractCoaInfoLoader></ContractCoaInfoLoader>}
          ></Route>
          <Route path="login" element={<LoginLoader></LoginLoader>}></Route>
          <Route
            path="/contractMember"
            element={<CommonInfoList></CommonInfoList>}
          ></Route>
          <Route
            path="/changeManager"
            element={<ChangeManagerLoader></ChangeManagerLoader>}
          ></Route>
          {/* <Route path="/tariff" element={<TariffLoader></TariffLoader>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
