import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from './components/Homepage'; // Import your Homepage component
import { ContactUs } from './components/ContactUs'; // Import your ContactUs component
import { Industries } from './components/Industries';
import { Reportssubs } from './components/Reportssubs';
import './App.css';
import { Consulting } from './components/Consulting';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/contactus" element={<ContactUs />} /> 
        <Route path="/Industries" element={<Industries />} />
        <Route path="/reportandsubs" element={<Reportssubs />} />
        <Route path="/Consulting" element={<Consulting />} />


        

      


      </Routes>
    </Router>
  );
}

export default App;
