import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrganizationDashboard.css';

const OrganizationDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="org-dashboard">
            <header className="dashboard-header">
                <h2 className="dashboard-logo">digitalTENDER</h2>
                <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
            </header>

            <main className="dashboard-content">
                <h1 className="dashboard-title">Welcome, Organization</h1>
                <div className="dashboard-actions">
                    <button onClick={() => navigate('/post-project')}>📤 Post New Project</button>
                    <button onClick={() => navigate('/projects')}>📁 View My Projects</button>
                    <button onClick={() => navigate('/bids')}>📨 Review Vendor Bids</button>
                </div>
            </main>
        </div>
    );
};

export default OrganizationDashboard;
