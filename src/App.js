import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from './components/Homepage'; // Import your Homepage component
import { ContactUs } from './components/ContactUs'; // Import your ContactUs component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Route to Homepage component */}
        <Route path="/contact-us" element={<ContactUs />} /> {/* Route to ContactUs component */}
      </Routes>
    </Router>
  );
}

export default App;
