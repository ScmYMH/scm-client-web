import React from "react";
import Header from "components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContractCoaInfoLoader from "components/contractCoa/ContractCoaInfoLoader";
import LoginLoader from './components/login/LoginLoader';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ContractCoaInfoLoader></ContractCoaInfoLoader>}
          ></Route>
                  <Route path="login" element={<LoginLoader></LoginLoader>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;