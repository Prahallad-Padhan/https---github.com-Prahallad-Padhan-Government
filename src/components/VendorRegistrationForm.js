import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../abis/BidProject.json';
const CONTRACT_ADDRESS = "0xc108e0E13cFD27B3e3d5f7361b073645f8F7E742";

const VendorRegistrationForm = () => {
  const [vendorName, setVendorName] = useState('');
  const [category, setCategory] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [yearsOfExp, setYearsOfExp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCategoryKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newCat = e.target.value.trim();
      if (newCat && !category.includes(newCat)) {
        setCategory([...category, newCat]);
        e.target.value = '';
      }
    }
  };

  const handleCertificationKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newCert = e.target.value.trim();
      if (newCert && !certifications.includes(newCert)) {
        setCertifications([...certifications, newCert]);
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields (no vendorAddress)
    if (!vendorName || category.length === 0 || !yearsOfExp) {
      setError('Please fill all required fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        setLoading(false);
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);

      // Assuming registerVendor signature:
      // function registerVendor(string memory _vendorName, uint _yearsOfExperience, string[] memory _category, string[] memory _certifications)
      const tx = await contract.registerVendor(
        vendorName,
        parseInt(yearsOfExp),
        category,
        certifications
      );

      console.log("Transaction sent:", tx.hash);
      await tx.wait();

      alert("Vendor registered successfully!");

      // Reset form
      setVendorName('');
      setCategory([]);
      setCertifications([]);
      setYearsOfExp('');
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Registration failed. See console for details.");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Register as Vendor</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Add Category (press Enter to add)"
            onKeyPress={handleCategoryKeyPress}
          />
          <div>
            {category.map((cat, idx) => (
              <span key={idx} style={{ marginRight: '5px' }}>
                {cat}{' '}
                <button
                  type="button"
                  onClick={() => setCategory(category.filter((_, i) => i !== idx))}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Add Certification (press Enter to add)"
            onKeyPress={handleCertificationKeyPress}
          />
          <div>
            {certifications.map((cert, idx) => (
              <span key={idx} style={{ marginRight: '5px' }}>
                {cert}{' '}
                <button
                  type="button"
                  onClick={() => setCertifications(certifications.filter((_, i) => i !== idx))}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <select value={yearsOfExp} onChange={(e) => setYearsOfExp(e.target.value)}>
            <option value="">Select Experience</option>
            <option value="0">0-2 years</option>
            <option value="3">3-5 years</option>
            <option value="6">6-10 years</option>
            <option value="10">More than 10 years</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

export default VendorRegistrationForm;
