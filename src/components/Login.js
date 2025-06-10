import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../abis/BidProject.json';

const CONTRACT_ADDRESS = "0xAa24543bD278Cb3e692a1ab819acf59bB0a4a658"; // replace with actual address

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

            // const isVendor = await contract.isVendor(userAddress);
            const isOrg = await contract.isRegistered(userAddress);

            if (isOrg) {
                navigate('/vendorDashboard');
                //} else if (isOrg) {
                // navigate('/organizationDashboard');
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
