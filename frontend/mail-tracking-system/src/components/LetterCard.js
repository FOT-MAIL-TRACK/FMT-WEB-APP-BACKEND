import React, {useState} from 'react';
import {createTheme, ThemeProvider,Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import './LetterCard.css'; 


const LetterCard = ({ letter }) => {
    

    // console.log(letter)
    // if (letter.trackingLog && letter.trackingLog.length > 0) {
    //     console.log(letter.trackingLog[0]); // Log the first element
    //     if (letter.trackingLog[0].status !== undefined) {
    //         console.log(letter.trackingLog[0].status); // Log the status if it exists
    //     } else {
    //         console.log("Status is undefined");
    //     }
    // } else {
    //     console.log("trackingLog is empty or undefined");
    // }

    

    if (!letter) {
        return <p>Loading...</p>; // Handle loading state
    }

    // const uniqueId = letter?.uniqueId || 'No ID Available';

    // const handlePageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };

    const theme = createTheme({
        palette: {
            customRed: {
                main: '#a1232b', // Define the custom color’s main value
                contrastText: '#fff', // Text color when using the button
            },
        },
    });

    return(
        
            <Card sx={{ maxWidth: 900, padding: '10px', margin: '40px auto', boxShadow: '0px 4px 10px rgba(161, 35, 43, 0.5)', borderRadius: 4 }}>            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Letter Unique ID: <span style={{ color: '#a1232b', fontWeight: 'bolder' }}>{letter.uniqueID || 'No ID Available'}</span>
                </Typography>
                <Typography variant="body1" color='black' gutterBottom>
                Sender: <span style={{ color: '#a1232b', fontWeight: 'bolder' }}>{letter.sender?.name || 'No Sender Info'} ({letter.sender.department || 'No Department'})</span>
                </Typography>
                <Typography variant="body1" color='black' gutterBottom>
                Receiver: <span style={{ color: '#a1232b', fontWeight: 'bolder' }}>{letter.receiver?.name || 'No Receiver Info'} ({letter.receiver.faculty || 'No Faculty'}) ({letter.receiver.department || 'No Department'})</span>
                </Typography>
                <Typography variant='body1' color='black' gutterBottom>
                Authorities:
                <span style={{ color: '#a1232b', fontWeight: 'bolder' }}>
                {letter.receiver?.authorities?.length ? (
                    letter.receiver.authorities.map((auth, index) => (
                        <span key={auth._id || index}>{auth.name} ({auth.role}) </span>
                        ))
                    ) : "No authorities"}
                </span>
                </Typography>
                <Grid container alignItems="center" spacing={0.5}>
                    <Grid item>
                        <IconButton 
                            color="success"
                            sx={{
                                fontSize: "2rem",
                                padding: '10px',
                            }}
                        >
                            <CheckCircle sx={{ fontSize: '2rem', color: '#4caf50' }}/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color='black' sx={{fontSize: '1.1rem'}}>
                            {letter.sender?.name || 'No Sender Info'}
                        </Typography>
                    </Grid>
                    
                    {letter.receiver?.authorities?.length ?  (
                                letter.receiver?.authorities.map((auth , index) => (
                                    <>
                                    <Grid item>
                        <IconButton 
                            color="success"
                            sx={{
                                fontSize: "2rem",
                                padding: '10px',
                            }}
                        
                        >
                            {letter.status !== undefined &&  letter.status === "In Progress" ? (
                                    <CheckCircle sx={{ fontSize: '2rem', color: '#4caf50' }} />
                                
                            ) : (
                                <RadioButtonUnchecked sx={{ fontSize: '2rem', color: '#f44336' }} />
                            )}
                            
                         </IconButton> 
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color='black' sx={{fontSize: '1.1rem'}} >
                            
                                    <span key={auth._id || index}>{auth.name} </span>
                                    </Typography>
                    </Grid>
                    </>
                                ))
                            ) : ""}
                        
                    <Grid item>
                        
                        <IconButton 
                            color="success"
                            sx={{
                                fontSize: "2rem",
                                padding: '10px',
                            }}
                        >
                        {letter.status !== undefined &&  letter.status === "Completed" ? (
                                    <CheckCircle sx={{ fontSize: '2rem', color: '#4caf50' }} />
                                
                            ) : (
                                <RadioButtonUnchecked  sx={{ fontSize: '2rem', color: '#f44336' }} />
                            )}
                         </IconButton>
                         
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color='black' sx={{fontSize: '1.1rem'}}>
                            {letter.receiver?.name || 'No Receiver Info'}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography 
                    variant="h6" 
                    color="#a1232b"
                    sx={{  
                        marginTop: 2,
                        color: letter.status === "Completed" ? 'green' : '#a1232b',
                     }}
                >
                    {letter.status !== undefined && letter.status === "Completed" ? "Letter reached Receiver" : "Letter still not reached Receiver"}
                </Typography>
            </CardContent>
        </Card>
       
    )
}

export default LetterCard;
