import React, { useState } from "react";
import Header from "components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContractCoaInfoLoader from "components/contractCoa/ContractCoaInfoLoader";
import LoginLoader from "./components/login/LoginLoader";
import CommonInfoList from "components/ContractMember/CommonInfoList";
import ChangeManagerLoader from "components/changeManager/ChangeManagerLoader";
import TariffLoader from "components/tariffInfo/TariffLoader";
import SideBar from "components/sidebar/Sidebar";
import Content from "components/content/Content";
import "./App.css";
function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <>
      <BrowserRouter>
        <div className="App wrapper">
          <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
          <Content
            toggleSidebar={toggleSidebar}
            sidebarIsOpen={sidebarIsOpen}
          />
        </div>
      </BrowserRouter>
      {/* <BrowserRouter>
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
      {/* </Routes> */}
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
