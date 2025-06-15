// src/components/ViewProjects.js
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { BrowserProvider, Contract } from 'ethers';
import { useNavigate } from 'react-router-dom'; // ✅ For navigation
import contractABI from '../abis/BidProject.json';

const CONTRACT_ADDRESS = '0xB176697Ba9e8c152b5ee80F3aA8d80D980d031A4';

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate(); // ✅ Hook to navigate

    const fetchProjects = async () => {
        try {
            if (!window.ethereum) return alert('MetaMask not installed');

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);

            const [orgNames, rawProjects] = await contract.getAllProjectsWithOrg();

            const formatted = rawProjects.map((p, i) => ({
                orgName: orgNames[i],
                owner: p.owner,
                projectId: p.projectId.toString(),
                title: p.title,
                budget: p.budget.toString(),
                description: p.description,
                startDate: p.startDate,
                timeline: p.timeline.toString(),
                location: p.location,
                category: p.category
            }));

            setProjects(formatted);
        } catch (err) {
            console.error("Error fetching projects:", err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleBidNow = (projectId) => {
        navigate(`/bidding/${projectId}`); // ✅ Navigate to bidding page with projectId
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom align="center">Available Projects</Typography>
            <Grid container spacing={3}>
                {projects.map((proj, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6">{proj.title}</Typography>
                                <Typography><strong>Organization:</strong> {proj.orgName}</Typography>
                                <Typography><strong>Project ID:</strong> {proj.projectId}</Typography>
                                <Typography><strong>Budget:</strong> ₹{proj.budget}</Typography>
                                <Typography><strong>Start Date:</strong> {proj.startDate}</Typography>
                                <Typography><strong>Timeline:</strong> {proj.timeline} days</Typography>
                                <Typography><strong>Location:</strong> {proj.location}</Typography>
                                <Typography><strong>Category:</strong> {proj.category}</Typography>
                                <Box mt={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleBidNow(proj.projectId)} // ✅ Pass projectId
                                    >
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

export default ViewProjects;
