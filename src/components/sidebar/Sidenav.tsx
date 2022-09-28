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
  FiAlignJustify,
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
          style={{ backgroundColor: "white" }}
        >
          <SidebarHeader style={{ backgroundColor: "white" }}>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <>
                  <img
                    src="../../images/posco_ict_log.png"
                    style={{ width: 200, margin: 20 }}
                  ></img>
                  <FiArrowLeftCircle />
                </>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent
            style={{ backgroundColor: "white", color: "#333333" }}
          >
            <Menu style={{ fontWeight: "bold", marginTop: 30 }}>
              <span style={{ marginLeft: 20, marginTop: 20 }}>계약 관리</span>
              <MenuItem
                style={{
                  marginTop: 20,
                }}
                active={true}
                icon={<FiAlignJustify />}
              >
                <Link to="/coa">운송 계약 관리</Link>
              </MenuItem>
              <MenuItem
                icon={<FiAlignJustify />}
                active={true}
              >
                <Link to="/contractMember">계약 담당자 등록</Link>
              </MenuItem>

              <MenuItem icon={<FiAlignJustify />} active={true}>
                <Link to="/changeManager">계약 담당자 변경</Link>
              </MenuItem>
              <hr></hr>
              <span style={{ marginLeft: 20, marginTop: 30 }}>
                물류비 정산 관리
              </span>

              <MenuItem
                style={{ marginTop: 20 }}
                icon={<FiAlignJustify />}
                active={true}
              >
                <Link to="/calculate">국제해송비정산</Link>
              </MenuItem>
              <hr></hr>
              <span style={{ marginLeft: 20, marginTop: 30 }}>분석</span>
              <MenuItem
                style={{ marginTop: 20 }}
                icon={<FiAlignJustify />}
                active={true}
              >
                <Link to="/shipmentInfo">계약 및 정산 현황 시각화</Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};
export default Sidenav;
