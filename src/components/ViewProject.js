import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../abis/BidProject.json';

const CONTRACT_ADDRESS = '0xB176697Ba9e8c152b5ee80F3aA8d80D980d031A4'; // replace if different

const ViewProject = () => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            if (!window.ethereum) return alert('MetaMask not installed');
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);

            const data = await contract.getAllProjects();
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Available Projects</Typography>
            <Grid container spacing={2}>
                {projects.map((proj, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography><strong>Owner:</strong> {proj.organizationName}</Typography>
                                <Typography><strong>Project ID:</strong> {proj.projectId.toString()}</Typography>
                                <Typography><strong>Title:</strong> {proj.title}</Typography>
                                <Typography><strong>Budget:</strong> {proj.budget.toString()}</Typography>
                                <Typography><strong>Start Date:</strong> {proj.startDate}</Typography>
                                <Typography><strong>Timeline:</strong> {proj.timeline.toString()} days</Typography>
                                <Typography><strong>Location:</strong> {proj.location}</Typography>
                                <Typography><strong>Category:</strong> {proj.category}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Button variant="contained" color="primary" size="small" fullWidth>
                                        Bid Now
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ViewProject;
