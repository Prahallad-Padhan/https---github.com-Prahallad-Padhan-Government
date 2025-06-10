import React from 'react';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome</h1>
            <button style={styles.button} onClick={() => navigate('/vendor/dashboard')}>
                Bid On Project
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
    },
    title: {
        marginBottom: '20px',
        fontSize: '2rem',
        color: '#333',
    },
    button: {
        margin: '10px',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
    },
};

export default VendorDashboard;
