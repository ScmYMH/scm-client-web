import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

interface Topbar {
  toggleSidebar: any;
}

const Topbar = ({ toggleSidebar }: Topbar) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>

      <NavbarToggler onClick={toggleTopbar} />
      <div
        style={{
          margin: "0",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Collapse isOpen={topbarIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to={"/contractMember"}>
                계약 담당자 등록
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={"/changeManager"}>
                계약 담당자 변경
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={"/"}>
                수출 COA
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={"/login"}>
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Topbar;
