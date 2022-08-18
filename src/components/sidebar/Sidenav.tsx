import React, { useState } from "react";
//react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
//icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiArrowRight,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";
//sidebar css from react-pro-sidebar module
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
const Sidenav = () => {
  //menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);
  //custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar
          collapsed={menuCollapse}
          style={{ backgroundColor: "#333333" }}
        >
          <SidebarHeader style={{ backgroundColor: "#333333" }}>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <>
                  <img
                    src="../../images/포스코ict로고_흰색버전_2.png"
                    style={{ width: 200 }}
                  ></img>
                  <FiArrowLeftCircle />
                </>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent style={{ backgroundColor: "#333333" }}>
            <Menu iconShape="square">
              <MenuItem style={{ fontWeight: "bold" }}>
                계약 관리
                <MenuItem active={true} icon={<FiHome />}>
                  <Link to="/coa">운송 계약 등록</Link>
                </MenuItem>
                <MenuItem icon={<FaList />}>
                  <Link to="/contractMember">계약 담당자 등록</Link>
                </MenuItem>
                <MenuItem icon={<FaRegHeart />}>
                  <Link to="/changeManager">계약 담당자 변경</Link>
                </MenuItem>
                <MenuItem icon={<RiPencilLine />}>
                  <Link to="/">타리프</Link>
                </MenuItem>
              </MenuItem>
              <MenuItem style={{ fontWeight: "bold" }}>
                정산 관리
                <MenuItem icon={<RiPencilLine />}>
                  <Link to="/">정산</Link>
                </MenuItem>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter style={{ backgroundColor: "#333333" }}>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};
export default Sidenav;
