import React from "react";
import Header from "components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContractCoaInfoLoader from "components/contractCoa/ContractCoaInfoLoader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ContractCoaInfoLoader></ContractCoaInfoLoader>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
