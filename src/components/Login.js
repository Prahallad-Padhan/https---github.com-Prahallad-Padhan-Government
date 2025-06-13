import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../abis/BidProject.json';

const CONTRACT_ADDRESS = "0xc108e0E13cFD27B3e3d5f7361b073645f8F7E742"; // replace with actual address

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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login</h2>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Connect Wallet'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
