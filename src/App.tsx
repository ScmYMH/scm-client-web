import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginLoader from './components/login/LoginLoader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginLoader></LoginLoader>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;