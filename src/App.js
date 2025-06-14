import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import OrganizationRegistrationForm from './components/OrganizationRegistrationForm';
import VendorRegistrationForm from './components/VendorRegistrationForm';
import Register from './components/Register';
import Login from './components/Login';
import VendorDashboard from './components/VendorDashboard';
import OrganizationDashboard from './components/OrganizationDashboard';
import PostProject from './components/PostProject';
import ViewProject from './components/ViewProject';
import Bidding from './components/Bidding'; // handles /bidding/:projectId

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/organization" element={<OrganizationRegistrationForm />} />
        <Route path="/register/vendor" element={<VendorRegistrationForm />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/view-project" element={<ViewProject />} />
        <Route path="/bidding/:projectId" element={<Bidding />} /> {/* ✅ Updated route */}
      </Routes>
    </Router>
  );
}

export default App;
