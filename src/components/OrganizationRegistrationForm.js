import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../abis/BidProject.json';

const CONTRACT_ADDRESS = "0xAa24543bD278Cb3e692a1ab819acf59bB0a4a658";

const OrganizationRegistrationForm = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!organizationName || !industry) {
      alert('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);

      const tx = await contract.registerOrganization(organizationName, industry);
      console.log("Transaction sent:", tx.hash);
      await tx.wait();

      alert("Organization registered successfully!");
      setOrganizationName('');
      setIndustry('');
    } catch (err) {
      console.error("Error:", err);
      alert("Registration failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Register as Organization</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="Organization Name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
};

export default OrganizationRegistrationForm;
