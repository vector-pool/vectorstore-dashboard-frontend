import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomeBanner = () => {
    const navigate = useNavigate();
    return (
        <Paper sx={{ padding: '20px', marginBottom: '40px', textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontWeight: 'bold' // Makes the heading bold
                }}
            >
                Welcome to Vector Store
            </Typography>
            <Typography 
                variant="body1" 
                gutterBottom 
                sx={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    // fontWeight: 'bold' // Makes the body text bold
                }}
            >
                Easily track your miner's performance and stay ahead in the game. We're here to support fair competition and help you succeed!
            </Typography>
        </Paper>
    );
};

export default WelcomeBanner;