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
import Sidenav from "components/sidebar/Sidenav";
function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <>
      <BrowserRouter>
        <div className="App wrapper">
          <Sidenav />
          <Content
            toggleSidebar={toggleSidebar}
            sidebarIsOpen={sidebarIsOpen}
          />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
