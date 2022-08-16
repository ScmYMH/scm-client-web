import React from "react";

import "./Header.css";

const Header = () => {
  return (
    <div>
      <header>
        <div
          style={{
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0,
          }}
        >
          <div
            style={{
              margin: "0",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h5>계약 등록</h5>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
