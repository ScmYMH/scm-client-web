import React from "react";

import "./Header.css";

const Header = () => {
  return (
    <div>
      <header>
        <div
          style={{
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>계약 등록 화면</h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
