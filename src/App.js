import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Personal from './pages/Personal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Personal" element={<Personal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
