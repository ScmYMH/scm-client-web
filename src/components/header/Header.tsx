import React from "react";

import "./Header.css";

const Header = () => {
  return (
    <div>
      <header>
        <div
          style={{
            marginTop: 10,
            marginRight: 30,
            marginBottom: 0,
            marginLeft: 30,
          }}
        >
          <div
            style={{
              marginBottom: "0",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h1>계약 등록</h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
