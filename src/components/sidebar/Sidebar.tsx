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
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="green" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>POSCO ICT</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>CONTENT</p>
        <NavItem>
          <NavLink style={{ color: "#fff" }} tag={Link} to={"/"}>
            {/* <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> */}
            수출 COA
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{ color: "#fff" }} tag={Link} to={"/pages"}>
            {/* <FontAwesomeIcon icon={faImage} className="mr-2" /> */}
            Tariff
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{ color: "#fff" }} tag={Link} to={"/faq"}>
            {/* <FontAwesomeIcon icon={faQuestion} className="mr-2" /> */}
            정산
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{ color: "#fff" }} tag={Link} to={"/contact"}>
            {/* <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> */}
            입찰관리
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      itle: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];
export default SideBar;
