import { FaIcons } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
const HeaderPict = () => {
  const nowUserId = localStorage.getItem("userId");
  const nowUserNm = localStorage.getItem("userNm");
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "right",
      }}
    >
      <BsPersonCircle
        style={{ marginTop: "2em", marginRight: "0.6em", fontSize: "1.2em" }}
      ></BsPersonCircle>
      <span
        style={{ marginTop: "1.8em", marginRight: "1em", fontSize: "1.2em" }}
      >
        <b>{nowUserNm}</b>님, 안녕하세요
      </span>
      <img
        src="../../images/green_tomorrow.png"
        width={"300em"}
        height={"90em"}
      ></img>
    </header>
  );
};

export default HeaderPict;
