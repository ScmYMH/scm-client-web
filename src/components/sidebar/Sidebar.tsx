import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "./SubMenu";

interface SideBarProps {
  isOpen: any;
  toggle: any;
}
const SideBar = ({ isOpen, toggle }: SideBarProps) => (
  <div
    className={classNames("sidebar", { "is-open": isOpen })}
    style={{ backgroundColor: "#d1d8e0" }}
  >
    <div className="sidebar-header" style={{ backgroundColor: "#d1d8e0" }}>
      <span color="green" onClick={toggle}>
        &times;
      </span>
      <h3 style={{ color: "#192a56" }}>POSCO ICT</h3>
    </div>
    <div className="side-menu">
      <Nav
        vertical
        justified
        pills
        fill
        className="list-unstyled pb-3 justified"
      >
        <p
          style={{
            color: "#192a56",
            marginBottom: "70px",
            fontWeight: "bold",
          }}
        ></p>
        <NavItem>
          <NavLink
            style={{
              color: "#192a56",
              marginBottom: "70px",
              fontWeight: "bold",
            }}
            tag={Link}
            to={"/"}
          >
            {/* <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> */}
            운송 계약 등록
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{
              color: "#192a56",
              fontWeight: "bold",
              marginBottom: "70px",
            }}
            tag={Link}
            to={"/changeManager"}
          >
            {/* <FontAwesomeIcon icon={faQuestion} className="mr-2" /> */}
            계약 담당자 변경
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ color: "black", marginBottom: "70px", fontWeight: "bold" }}
            tag={Link}
            to={"/contractMember"}
          >
            {/* <FontAwesomeIcon icon={faImage} className="mr-2" /> */}
            계약 담당자 등록
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{
              color: "black",
              marginBottom: "100px",
              fontWeight: "bold",
            }}
            tag={Link}
            to={"/tariff"}
          >
            {/* <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> */}
            정산
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

export default SideBar;
