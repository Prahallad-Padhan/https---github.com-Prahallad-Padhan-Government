import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import OrganizationRegistrationForm from './components/OrganizationRegistrationForm';
import VendorRegistrationForm from './components/VendorRegistrationForm';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/organization" element={<OrganizationRegistrationForm />} />
        <Route path="/register/vendor" element={<VendorRegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
