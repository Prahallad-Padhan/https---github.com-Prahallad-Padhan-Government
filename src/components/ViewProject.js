import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Divider,
    Chip,
    Paper
} from '@mui/material';
import { BrowserProvider, Contract } from 'ethers';
import { useNavigate } from 'react-router-dom';
import contractABI from '../abis/BidProject.json';

import { BID_PROJECT_CONTRACT_ADDRESS } from '../constants';

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                budget: parseInt(p.budget).toLocaleString(),
                description: p.description,
                startDate: new Date(p.startDate).toLocaleDateString(),
                timeline: p.timeline.toString(),
                location: p.location,
                category: p.category
            }));

            setProjects(formatted);
        } catch (err) {
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleBidNow = (projectId) => {
        navigate(`/bidding/${projectId}`);
    };

    return (
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
                Available Projects
            </Typography>
            <br />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <CircularProgress />
                </Box>
            ) : projects.length === 0 ? (
                <Typography align="center" sx={{ mt: 6 }} color="text.secondary">
                    No projects available right now. Please check back later.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {projects.map((proj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card elevation={4} sx={{ borderRadius: 3, p: 2, background: '#fefefe' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {proj.title}
                                    </Typography>

                                    <Chip
                                        label={`Organization: ${proj.orgName}`}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />

                                    <Divider sx={{ my: 1 }} />

                                    <Typography variant="body2"><strong>Project ID:</strong> {proj.projectId}</Typography>
                                    <Typography variant="body2"><strong>Budget:</strong> ₹{proj.budget}</Typography>
                                    <Typography variant="body2"><strong>Start Date:</strong> {proj.startDate}</Typography>
                                    <Typography variant="body2"><strong>Timeline:</strong> {proj.timeline} days</Typography>
                                    <Typography variant="body2"><strong>Location:</strong> {proj.location}</Typography>
                                    <Typography variant="body2"><strong>Category:</strong> {proj.category}</Typography>

                                    <Box mt={2}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleBidNow(proj.projectId)}
                                            sx={{ textTransform: 'none', fontWeight: 500 }}
                                        >
                                            Bid Now
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ViewProjects;
