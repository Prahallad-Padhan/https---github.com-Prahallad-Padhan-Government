import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorDashboard.css';

const VendorDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="vendor-dashboard">
            <header className="dashboard-header">
                <h2 className="dashboard-logo">digitalTENDER</h2>
                <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
            </header>

            <main className="dashboard-content">
                <h1 className="dashboard-title">Welcome, Vendor</h1>
                <div className="dashboard-actions">
                    <button onClick={() => navigate('/view-project')}>📂 View Open Projects</button>
                    <button onClick={() => navigate('/my-bids')}>📑 My Bids</button>
                    <button onClick={() => navigate('/vendor-profile')}>👤 View Profile</button>
                </div>
            </main>
        </div>
    );
};

export default VendorDashboard;
