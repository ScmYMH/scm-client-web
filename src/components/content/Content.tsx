import React from "react";
import classNames from "classnames";
import { Col, Container, Row } from "reactstrap";
import ContractCoaInfoLoader from "components/contractCoa/ContractCoaInfoLoader";
import CommonInfoList from "components/ContractMember/CommonInfoList";
import ChangeManagerLoader from "components/changeManager/ChangeManagerLoader";
import TariffLoader from "components/tariffInfo/TariffLoader";
import Topbar from "./Topbar";
import { Route, Routes } from "react-router";
import LoginLoader from "components/login/LoginLoader";
import HeaderPict from "components/header/HeaderPict";
import Sidenav from "components/sidebar/Sidenav";
import CalculateInfoLoader from "components/calculate/CalculateInfoLoader";
import DashBoardLoader from "components/shipmentInfo/dashboard/DashBoardLoader";

interface ContentProps {
  sidebarIsOpen: any;
  toggleSidebar: any;
}

const Content = ({ sidebarIsOpen, toggleSidebar }: ContentProps) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
    style={{
      padding: "0",
    }}
  >
    <Routes>
      <Route path="/" element={<LoginLoader></LoginLoader>}></Route>
      <Route
        path="/coa"
        element={
          <div style={{ display: "inline-flex" }}>
            <Sidenav />
            <Row style={{ marginLeft: "0.5rem", marginRight: "2rem" }}>
              <HeaderPict />
              <ContractCoaInfoLoader></ContractCoaInfoLoader>
            </Row>
          </div>
        }
      ></Route>
      <Route path="login" element={<LoginLoader></LoginLoader>}></Route>
      <Route
        path="/contractMember"
        element={
          <div style={{ display: "inline-flex" }}>
            <Sidenav />
            <Row style={{ marginLeft: "0.5rem", marginRight: "2rem" }}>
              <HeaderPict />
              <CommonInfoList></CommonInfoList>
            </Row>
          </div>
        }
      ></Route>
      <Route
        path="/changeManager"
        element={
          <div style={{ display: "inline-flex" }}>
            <Sidenav />
            <Row style={{ marginLeft: "0.5rem", marginRight: "2rem" }}>
              <HeaderPict />
              <ChangeManagerLoader></ChangeManagerLoader>
            </Row>
          </div>
        }
      ></Route>
      <Route
        path="/calculate"
        element={
          <div style={{ display: "inline-flex" }}>
            <Sidenav />
            <Row style={{ marginLeft: "0.5rem", marginRight: "2rem" }}>
              <HeaderPict />
              <CalculateInfoLoader></CalculateInfoLoader>
            </Row>
          </div>
        }
      ></Route>
      <Route
        path="/shipmentInfo"
        element={
          <div style={{ display: "inline-flex" }}>
            <Sidenav />
            <Row style={{ marginLeft: "0.5rem", marginRight: "2rem" }}>
              <HeaderPict />
              <DashBoardLoader></DashBoardLoader>
            </Row>
          </div>
        }
      ></Route>
    </Routes>
  </Container>
);

export default Content;
