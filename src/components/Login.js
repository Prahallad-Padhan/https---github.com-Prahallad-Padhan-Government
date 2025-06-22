import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../abis/BidProject.json';
import './Login.css';

const CONTRACT_ADDRESS = "0xB176697Ba9e8c152b5ee80F3aA8d80D980d031A4";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError('');

            if (!window.ethereum) {
                setError("MetaMask not detected");
                return;
            }

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();

            const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);

            const isVendor = await contract.isVendor(userAddress);
            const isOrg = await contract.isOrganization(userAddress);

            if (isOrg) {
                navigate('/organization/dashboard');
            } else if (isVendor) {
                navigate('/vendor/dashboard');
            } else {
                setError("Address not registered as vendor or organization.");
            }
        } catch (err) {
            console.error(err);
            setError("Login failed. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Connect your wallet to continue</p>
                <button className="login-button" onClick={handleLogin} disabled={loading}>
                    {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
                {error && <p className="login-error">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
