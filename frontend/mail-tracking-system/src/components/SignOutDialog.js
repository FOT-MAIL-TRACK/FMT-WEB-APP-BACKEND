import React ,{useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignOutDialog = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen =() => {
        setOpen(true);  
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignout = () => {
        localStorage.removeItem('token');
        setOpen(false);
        navigate('/');
    }

    return (
        <>
            <Button color='Info'
            onClick={handleClickOpen}
            sx={{
                color: "#000",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "background 0.3s ease",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": {
                backgroundColor: "#871c23", // slightly darker red for hover effect (like your link hover)
                },
            }}>
                Signout
            </Button>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                width="100px"
                maxWidth="xs" >
            <DialogTitle align='center' padding='20px'>{"Confirm Signout"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you want to sign out?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                 <Button onClick={handleSignout} color="default"   sx={{
                        backgroundColor: "#a1232b",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        transition: "background 0.3s ease",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                        "&:hover": {
                        backgroundColor: "#871c23", 
                        },
                    }} autoFocus>
                    Signout
                 </Button>
                 <Button onClick={handleClose} color="secondary" sx={{ fontWeight: 'bold'}}>
                    Close
                 </Button>
            </DialogActions>
            </Dialog>
        </>
    )
}

export default SignOutDialog;