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
            sx={{ fontWeight: 'bold', fontSize: '19px', marginLeft: '80px',textTransform: 'none', padding: '30px auto'}}>
                Signout
            </Button>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                sx={{ width:"600px", marginLeft:"650px"}} >
            <DialogTitle align='center' padding='20px'>{"Confirm Signout"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you want to sign out?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                 <Button onClick={handleSignout} color="default"  backgroundColor="#a1232b" sx={{ fontWeight: 'bold', align: "center"}} autoFocus>
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