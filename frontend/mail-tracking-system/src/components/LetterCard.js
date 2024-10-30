import React, {useState} from 'react';
import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import './LetterCard.css'; 


const LetterCard = ({ letter }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;

    if (!letter) {
        return <p>Loading...</p>; // Handle loading state
    }

    // const uniqueId = letter?.uniqueId || 'No ID Available';

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return(
        <Card sx={{ maxWidth: 900, padding: '10px',margin: '40px auto', boxShadow: '0px 4px 10px rgba(161, 35, 43, 0.5)' ,  borderRadius: 4}}>
            <CardContent>
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
                        <IconButton color="primary">
                            <CheckCircle />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color='black'>
                            {letter.sender?.name || 'No Sender Info'}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {letter.isDelivered ? (
                        <IconButton color="success">
                            <CheckCircle />
                         </IconButton> ): (
                         <IconButton color="default">
                            <RadioButtonUnchecked />
                         </IconButton>)}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color='black'>
                            {letter.receiver?.authorities?.length?  (
                                letter.receiver?.authorities.map((auth , index) => (
                                    <span key={auth._id || index}>{auth.name} </span>
                                ))
                            ) : "No authorities Info"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {letter.isDelivered ? (
                        <IconButton color="success">
                            <CheckCircle />
                         </IconButton> ): (
                         <IconButton color="default">
                            <RadioButtonUnchecked />
                         </IconButton>)}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color='black'>
                            {letter.receiver?.name || 'No Receiver Info'}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body1" color="text.primary" sx={{ marginTop: 2 }}>
                    {letter.isDelivered ? "Letter reached receiver" : "Letter still not reached receiver"}
                </Typography>
            {/* <PaginationComponent 
                totalPages={totalPages} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            /> */}
            </CardContent>
        </Card>
    )
}

export default LetterCard;
