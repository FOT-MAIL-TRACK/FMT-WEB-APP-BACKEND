import React,{useState} from 'react';
import './internalLetter.css';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const InternalLetter = () => {

    const [senderName, setSenderName] = useState('');
    const [senderRegno, setSenderRegNo] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverRegno, setReceiverRegNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [recfaculty, setRecFaculty] = useState('');
    const [recdepartment, setRecDepartment] = useState('');
    const [uniqueID, setUniqueID] = useState(null);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
        const letterData = {
            sender : {
                name : senderName,
                registrationNumber: senderRegno,
                address : senderAddress
            },
            receiver : {
                name : receiverName,
                registrationNumber : receiverRegno,
                receiverRole : designation,
                faculty: recfaculty,
                department : recdepartment
            }
        }


        try{
            const response = await axios.post("http://localhost:5001/api/letters/create-internal-letter", letterData);
            setUniqueID(response.data.uniqueID);
            if (response.status === 201){
                console.log('Internal-Letter Created:', response.data);
                setOpen(true);
            }
        }
        catch (error){
            console.error(error.response.data.message);
        }
    }

    const handleClose = ()=> {
        setOpen(false);
    }
 
    return(
        <>
            <RealNavBar/>
            <div style={{ marginTop: '100px' }}> 
            <NavBar />
             </div>

            <div className='ex-lettercontainer'>
            <div className='container-ex'>
            <div className='content-ex'>
            <h2>Enter letter/parcel information</h2>
            </div>
            <div className='content-sender'>
            <h2>Sender's information</h2>
            </div>
            
            <form 
            className='form-letter'
            onSubmit={handleSubmit} >
                <label className='sender-name'>
                    <h2 className='label-h2'>Sender's name</h2>
                    <input type="text" 
                    placeholder="Enter sender's name" 
                    value= {senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required />
                </label>
                <label className='sender-regno'>
                    <h2 className='label-h2'>Sender's registration number</h2>
                    <input type="text" 
                    placeholder="Enter sender's registration number" 
                    value={senderRegno}
                    onChange={(e) => setSenderRegNo(e.target.value)}
                    required />
                </label>
                <label className='sender-address'>
                    <h2 className='label-h2'>Sender's address</h2>
                    <input type="text" 
                    placeholder="Enter sender's address"
                    value= {senderAddress}
                    onChange={(e)=> setSenderAddress(e.target.value)}
                    required />
                </label>
                <h2 >Receiver's information</h2>
                <label className='receiver-name'>
                    <h2 className='label-h2'>Receiver's name</h2>
                    <input type="text" 
                    placeholder="Enter receiver's name" 
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    required />
                </label>
                <label className='receiver-reg'>
                    <h2 className='label-h2'>Registration number</h2>
                    <input type="text" 
                    placeholder="Enter receiver's registration number"
                    value={receiverRegno}
                    onChange={(e) => setReceiverRegNo(e.target.value)}
                    required />
                </label>
                <label className='receiver-designation'>
                    <h2 className='label-h2'>Designation</h2>
                    <select 
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required>
                        <option value="" disabled selected>Choose Designation</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Dean">dean</option>
                        <option value="Department Head">dept head</option>
                        <option value="PostalDepartment">postal dept</option>
                        <option value="FacultyMA">FacultyMA</option>
                        <option value="DepartmentMA">DepartmentMA</option>
                        <option value="WorkAid">work aid</option>
                        <option value="Admin">admin</option>
                        <option value="Technical Officer">TO</option>
                        <option value="Demonstrator">demo</option>
                    </select>
                </label>
                <label className='receiver-fac'>
                    <h2>Faculty</h2>
                    <select 
                    value={recfaculty}
                    onChange={(e)=> setRecFaculty(e.target.value)}
                    required>
                        <option value="" disabled selected>Choose Faculty</option>
                        <option value="FOT">FOT</option>
                        <option value="FMSC">FMSC</option>
                        <option value="FOE">FOE</option>
                        <option value="FHSS">FHSS</option>
                        <option value="FAS">FAS</option>
                        <option value="FAHS">FAHS</option>
                        <option value="FDS">FDS</option>
                        <option value="FUAB">FUAB</option>
                        <option value="FOC">FOC</option>
                        <option value="FMS">FMS</option>
                        <option value="FGS">FGS</option>
                    </select>
                </label>
                <label className='receiver-dept'>
                    <h2>Department</h2>
                    <select 
                    value={recdepartment}
                    onChange={(e) => setRecDepartment(e.target.value)}
                    required>
                        <option value="" disabled selected>Choose Department</option>
                        <option value="ICT">ICT</option>
                        <option value="BST">BST</option>
                        <option value="MMT">MMT</option>
                        <option value="SFT">SFT</option>
                        <option value="CET">CET</option>
                    </select>
                </label>
                <div className='generate-btn'>
                    <button type='submit'>Generate ID</button>
                </div>
            </form>

            {uniqueID && (
                <Dialog open={open} onClose={handleClose} PaperProps={{ style: { padding: '20px', borderRadius: '12px' } }}>
                        <DialogTitle sx={{ backgroundColor: '#a1232b', color: 'white' }}>
                        Generated Unique ID:
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="h4" color="secondary" align="center"  fontWeight="bold" marginTop="20px">{uniqueID}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="Info"  backgroundColor="#a1232b" variant="contained" sx={{ borderRadius: '8px' }}>
                            Close
                            </Button>
                        </DialogActions>
                </Dialog>
                
            )}

            </div>
            </div>
            <Footer/>
        </>
    )
}

export default InternalLetter;