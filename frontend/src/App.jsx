import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './assets/Pages/Login';
import Home from './assets/Pages/Home';

import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
};

export default App
