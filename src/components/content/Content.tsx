import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import ContractCoaInfoLoader from "components/contractCoa/ContractCoaInfoLoader";
import CommonInfoList from "components/ContractMember/CommonInfoList";
import ChangeManagerLoader from "components/changeManager/ChangeManagerLoader";
import TariffLoader from "components/tariffInfo/TariffLoader";
import Topbar from "./Topbar";
import { Route, Routes } from "react-router";
import LoginLoader from "components/login/LoginLoader";

interface ContentProps {
  sidebarIsOpen: any;
  toggleSidebar: any;
}

const Content = ({ sidebarIsOpen, toggleSidebar }: ContentProps) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
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
    </Routes>
  </Container>
);

export default Content;
