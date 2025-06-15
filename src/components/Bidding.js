import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import BidProjectABI from '../abis/BidProject.json';

const CONTRACT_ADDRESS = '0xB176697Ba9e8c152b5ee80F3aA8d80D980d031A4';

const Bidding = () => {
    const { projectId } = useParams();  // ✅ get from URL
    const [proposal, setProposal] = useState('');
    const [timeNeeded, setTimeNeeded] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!window.ethereum) return alert('Install MetaMask first');

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(CONTRACT_ADDRESS, BidProjectABI, signer);

            const tx = await contract.placeBid(
                Number(projectId),
                Number(bidAmount),
                proposal,
                Number(timeNeeded)
            );

            setStatus('Submitting transaction...');
            await tx.wait();
            setStatus('Bid submitted!');
        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <h2>Bidding for Project ID: {projectId}</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    placeholder="Your Proposal"
                    required
                />
                <input
                    type="number"
                    value={timeNeeded}
                    onChange={(e) => setTimeNeeded(e.target.value)}
                    placeholder="Time Needed (days)"
                    required
                />
                <input
                    type="number"
                    step="1"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Bid Amount (INR)"
                    required
                />
                <button type="submit">Submit Bid</button>
                {status && <p>{status}</p>}
            </form>
        </div>
    );
};

export default Bidding;
