import { FaIcons } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
const HeaderPict = () => {
  const nowUserId = localStorage.getItem("userId");
  const nowUserNm = localStorage.getItem("userNm");
  return (
    <header
      style={{
        paddingLeft: "32px",
        paddingRight: "32px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "right",
      }}
    >
      <BsPersonCircle
        style={{ marginTop: 20, marginRight: 5, fontSize: 20 }}
      ></BsPersonCircle>
      <span style={{ marginTop: 20, marginRight: 20 }}>
        {nowUserNm}님, 안녕하세요
      </span>
      <img
        src="../../images/withPosco.png"
        style={{ marginTop: "10px" }}
        width={"200px"}
        height={"40px"}
      ></img>
    </header>
  );
};

export default HeaderPict;
