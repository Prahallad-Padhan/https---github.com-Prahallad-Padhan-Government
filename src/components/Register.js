import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="registration-card">
                <h1 className="title">Choose Registration Type</h1>
                <p className="subtitle">Select how you'd like to register with our platform</p>
                
                <div className="button-group">
                    <button 
                        className="register-button vendor-button" 
                        onClick={() => navigate('/register/vendor')}
                    >
                        <div className="button-icon">🏪</div>
                        <div className="button-content">
                            <span className="button-title">Register as Vendor</span>
                            <span className="button-description">Sell your products and services</span>
                        </div>
                    </button>
                    
                    <button 
                        className="register-button organization-button" 
                        onClick={() => navigate('/register/organization')}
                    >
                        <div className="button-icon">🏢</div>
                        <div className="button-content">
                            <span className="button-title">Register as Organization</span>
                            <span className="button-description">Manage your business operations</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;