import { FaIcons } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
const HeaderPict = () => {
  const nowUserId = localStorage.getItem("userId");
  const nowUserNm = localStorage.getItem("userNm");
  return (
    <header
      style={{
        paddingRight: "4em",
        marginBottom: "3em",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          transition: "0.3s",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            marginBottom: "1em",
            marginRight: "1.5em",
          }}
        >
          <BsPersonCircle
            style={{ marginRight: "0.5em", fontSize: 20 }}
          ></BsPersonCircle>
          <span style={{ marginRight: "0.5em" }}>
            {nowUserNm}님, 안녕하세요
          </span>
        </div>
        <div
          style={{
            marginRight: "0.5em",
            marginTop: "0.5em",
            marginBottom: "1em",
          }}
        >
          <img
            src="../../images/company_slog.png"
            width={"180em"}
            height={"70em"}
          ></img>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          flexDirection: "column",
        }}
      ></div>
    </header>
  );
};

export default HeaderPict;
