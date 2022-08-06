import React from "react";
import Header from "components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContractCoaInfoLoader from "components/contractCoa/ContractCoaInfoLoader";
import TariffLoader from "components/tariffInfo/TariffLoader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ContractCoaInfoLoader></ContractCoaInfoLoader>}
          ></Route>
          <Route path="/tariff" element={<TariffLoader></TariffLoader>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
