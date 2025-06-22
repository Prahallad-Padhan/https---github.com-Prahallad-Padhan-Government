import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import BidProjectABI from '../abis/BidProject.json';
import {
    Box,
    TextField,
    Typography,
    Button,
    Paper,
    CircularProgress
} from '@mui/material';

const CONTRACT_ADDRESS = '0xB176697Ba9e8c152b5ee80F3aA8d80D980d031A4';

const Bidding = () => {
    const { projectId } = useParams();
    const [proposal, setProposal] = useState('');
    const [timeNeeded, setTimeNeeded] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setStatus('');

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
            setStatus('✅ Bid submitted successfully!');
        } catch (err) {
            console.error(err);
            setStatus(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" justifyContent="center" mt={5} px={2}>
            <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
                <Typography variant="h5" gutterBottom>
                    Place Bid for Project #{projectId}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Proposal"
                        value={proposal}
                        onChange={(e) => setProposal(e.target.value)}
                        placeholder="Describe your plan"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />

                    <TextField
                        label="Time Needed (days)"
                        type="number"
                        value={timeNeeded}
                        onChange={(e) => setTimeNeeded(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Bid Amount (INR)"
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Bid'}
                    </Button>
                </form>

                {status && (
                    <Typography
                        sx={{ mt: 2 }}
                        color={status.startsWith('❌') ? 'error' : 'success.main'}
                    >
                        {status}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default Bidding;
