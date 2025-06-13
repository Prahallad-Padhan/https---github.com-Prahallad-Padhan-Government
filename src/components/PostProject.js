import React from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ethers } from 'ethers';
import contractABI from '../abis/BidProject.json';

const CONTRACT_ADDRESS = "0xB176697Ba9e8c152b5ee80F3aA8d80D980d031A4"; // Replace with actual contract

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    budget: Yup.number().required('Budget is required').positive(),
    startDate: Yup.date().required('Start Date is required'),
    timeline: Yup.number().required('Timeline is required').positive().integer(),
    location: Yup.string().required('Location is required'),
    category: Yup.string().required('Category is required'),
});

const PostProject = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (!window.ethereum) {
                alert("Please install MetaMask!");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

            const tx = await contract.postProject(
                values.title,
                values.description,
                values.budget,
                values.startDate, // already in string format
                values.timeline,
                values.location,
                values.category
            );

            console.log("Transaction hash:", tx.hash);
            await tx.wait();
            alert("Project posted successfully!");

        } catch (error) {
            console.error("Error posting project:", error);
            alert("Failed to post project. Check console for details.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                budget: '',
                startDate: '',
                timeline: '',
                location: '',
                category: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, errors, touched, isSubmitting }) => (
                <Form>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Project Title"
                                    value={values.title}
                                    onChange={handleChange}
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    id="description"
                                    name="description"
                                    label="Project Description"
                                    value={values.description}
                                    onChange={handleChange}
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="budget"
                                    name="budget"
                                    label="Budget (in Indian Rupees)"
                                    type="number"
                                    value={values.budget}
                                    onChange={handleChange}
                                    error={touched.budget && Boolean(errors.budget)}
                                    helperText={touched.budget && errors.budget}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="startDate"
                                    name="startDate"
                                    label="Start Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={values.startDate}
                                    onChange={handleChange}
                                    error={touched.startDate && Boolean(errors.startDate)}
                                    helperText={touched.startDate && errors.startDate}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="timeline"
                                    name="timeline"
                                    label="Timeline (in days)"
                                    type="number"
                                    value={values.timeline}
                                    onChange={handleChange}
                                    error={touched.timeline && Boolean(errors.timeline)}
                                    helperText={touched.timeline && errors.timeline}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="location"
                                    name="location"
                                    label="Location"
                                    value={values.location}
                                    onChange={handleChange}
                                    error={touched.location && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="category"
                                    name="category"
                                    label="Category"
                                    value={values.category}
                                    onChange={handleChange}
                                    error={touched.category && Boolean(errors.category)}
                                    helperText={touched.category && errors.category}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <Button variant="contained" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Posting...' : 'Post Project'}
                            </Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default PostProject;
