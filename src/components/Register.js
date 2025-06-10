import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={() => navigate('/register/vendor')}>
                Register as Vendor
            </button>
            <button style={styles.button} onClick={() => navigate('/register/organization')}>
                Register as Organization
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

export default Register;
