import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './components/login/login';

function App() {
  return (
    <Routes>
        <Route path="login" element={<Login></Login>}></Route>
    </Routes>
  );
}

export default App;
