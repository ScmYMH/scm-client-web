import { FaIcons } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
const HeaderPict = () => {
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
        홍혜정님, 안녕하세요
      </span>
      <img src="../../images/withPosco.png" width={"200px"}></img>
    </header>
  );
};

export default HeaderPict;