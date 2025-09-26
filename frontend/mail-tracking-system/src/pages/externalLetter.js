import React,{useState} from 'react';
import './externalLetter.css';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';


const ExternalLetter = () => {

    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverRegno, setReceiverRegNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [recfaculty, setRecFaculty] = useState('');
    const [recdepartment, setRecDepartment] = useState('');
    const [uniqueID, setUniqueID] = useState(null);
    const [open, setOpen] = useState(false);
    const [authorities, setAuthorities] = useState([{ name: '', role: '' }]);
    
    const handleReceiverRegNoChange = async (e) => {
        const registrationNumber = e.target.value;
        setReceiverRegNo(registrationNumber);

            try{
                const response = await axios.get(`http://localhost:5001/api/users/users/${registrationNumber}`)
                if (response.status === 200){
                    
                    setReceiverName(response.data.name);
                    setDesignation(response.data.role);
                    setRecFaculty(response.data.faculty);
                    setRecDepartment(response.data.department);
                    // setDepartments(departmentsForFaculty || []);
                }else {
                    setReceiverName("");
                    setDesignation("");
                    setRecFaculty("");
                    setRecDepartment("");
                    // setDepartments([]);
                }
            }
            catch(error){
                console.error("Error fetching user data:", error);
                setReceiverName("");
                setDesignation("");
                setRecFaculty("");
                setRecDepartment("");
                //setDepartments([]);
            }
        
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const letterData = {
            sender : {
                name : senderName,
                address : senderAddress
            },
            receiver : {
                name : receiverName,
                registrationNumber : receiverRegno,
                receiverRole : designation,
                authorities: authorities,
                faculty: recfaculty,
                department : recdepartment,
            },
            
        };
    
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5001/api/letters/create-external-letter",
                letterData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUniqueID(response.data.uniqueID);
            if (response.status === 201) {
                console.log("External-Letter Created:", response.data);
                setOpen(true);
            }
            }
        catch(error){
            console.error(error.response.data.message || 'Error creating letter:');
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAuthorityChange = (index, field, value) => {
        const newAuthorities = [...authorities];
        newAuthorities[index][field] = value;
        setAuthorities(newAuthorities);
    };
    
    const addAuthority = () => {
        setAuthorities([...authorities, {registrationNumber: '', name: '',  role: ''  }]);
    };
    
    const removeAuthority = (index) => {
        const newAuthorities = authorities.filter((_, i) => i !== index);
        setAuthorities(newAuthorities);
    };
    

    return(
        <>
        <RealNavBar />
        <div style={{ marginTop: '100px' }}> 
        <NavBar />
        </div>

        <div className='ex-lettercontainer'>
            <div className='container-external'>
            <div className='content-ex'>
            <h2>Enter letter/parcel information</h2>
            </div>
            <div className='content-sender'>
            <h1>Sender's information</h1>
            </div>
            
            <form 
            className='form-letter'
            onSubmit={handleSubmit}>
                <label className='sender-name'>
                    <h2 className='label-h2'>Sender's name</h2>
                    <input type="text" 
                    placeholder="Enter sender's name" 
                    value={senderName}
                    onChange = {(e) => setSenderName(e.target.value)}
                    required />
                </label>
                <label className='sender-address'>
                    <h2 className='label-h2'>Sender's address</h2>
                    <input type="text" 
                    placeholder="Enter sender's address" 
                    value={senderAddress}
                    onChange={(e)=> setSenderAddress(e.target.value)}
                    required />
                </label>
            <h1>Receiver's information</h1>
                <div style={{ marginTop: '50px' }}>  </div>
                <label className='receiver-reg'>
                    <h2 className='label-h2'>Registration number</h2>
                    <input type="text"
                    placeholder="Enter receiver's registration number" 
                    value= {receiverRegno}
                    onChange={handleReceiverRegNoChange}
                    required />
                </label>
                <label className='receiver-name'>
                    <h2 className='label-h2'>Receiver's name</h2>
                    <input type="text" 
                    placeholder="Enter receiver's name" 
                    value = {receiverName}
                    readOnly
                    required />
                </label>
                <label className='receiver-designation'>
                    <h2 className='label-h2'>Designation</h2>
                    <select 
                    value = {designation}
                    onChange={handleReceiverRegNoChange}
                    required>
                        <option value="" disabled selected>Choose Designation</option>
                        <option value="Dean">Dean</option>
                        <option value="Department Head">Department head</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="PostalDepartmentMA">Postal department MA</option>
                        <option value="FacultyMA">Faculty MA</option>
                        <option value="DepartmentMA">Department MA</option>
                        <option value="WorkAid">Work aid</option>
                        <option value="Super Admin">Admin</option>
                        <option value="Technical Officer">Technial Officer</option>
                        <option value="Demonstrator">Demonstrator</option>
                    </select>
                </label>
                <label className='receiver-fac'>
                    <h2 className='label-h2'>Receiver's faculty</h2>
                    <select 
                    value = {recfaculty}
                    onChange={handleReceiverRegNoChange}
                    required>
                        <option value="" disabled selected>Choose Faculty</option>
                        <option value="Administration">General Administration</option>
                        <option value="FOT">Faculty of Technology</option>
                        <option value="FMSC">Faculty of Management Studies and Commerce</option>
                        <option value="FMS">Faculty of Medical Sciences</option>
                        <option value="FAS">Faculty of Allied Health Sciences</option>
                        <option value="FHSS">Faculty of Humanities and Social Sciences</option>
                        <option value="FAHS">Faculty of Applied Sciences</option>
                        <option value="FGS">Faculty of Graduate Sciences</option>
                        <option value="FOE">Faculty of Engineering</option>
                        <option value="Dental">Faculty of Dental Sciences</option>
                        <option value="FAUB">Faculty of Urban and Aquatic Bioresources</option>
                        <option value="FOC">Faculty of Computing</option>
                        <option value="Postal Department">Postal Department</option>
                    </select>
                </label>
                <label className='receiver-dept'>
                <h2 className='label-h2'>Receiver's department</h2>
                <input 
                    value={recdepartment}
                    placeholder="departments"
                    readOnly
                    required
                />
                </label>
                <h1>Authorities details</h1>
                {authorities.map((authority, index) => (
                    <div key={index} className='authority-section'>
                    <label>
                        <h2 className='label-h2'>Authority Registration number:</h2>
                        <input 
                        type="text" 
                        placeholder="Enter authority registration number"
                        value={authority.registrationNumber}
                        onChange={(e) => handleAuthorityChange(index, 'registrationNumber', e.target.value)}
                        required
                        />
                    </label>
                    <label>
                        <h2 className='label-h2'>Authority Name:</h2>
                        <input 
                        type="text" 
                        placeholder="Enter authority name"
                        value={authority.name}
                        onChange={(e) => handleAuthorityChange(index, 'name', e.target.value)}
                        //onChange={handleReceiverRegNoChange}
                        required
                        />
                </label>
                    <label>
                        <h2 className='label-h2'>Authority Role:</h2>
                        <select 
                        value={authority.role}
                        onChange={(e) => handleAuthorityChange(index, 'role', e.target.value)}
                        required
                        >
                        <option value="" disabled>Select Authority Role</option>
                        <option value="PostalDepartmentMA">PostalDepartmentMA</option>
                        <option value="FacultyMA">FacultyMA</option>
                        <option value="DepartmentMA">DepartmentMA</option>
                        <option value="Department Head">Department Head</option>
                        <option value="Lecturer">Lecturer</option>
                    </select>
                </label>
                <div className='remove-btn'>
                    <button type="button" onClick={() => removeAuthority(index)}>Remove</button>
                </div>
            </div>
            ))}
                <div className='add-btn'>
                    <button type="button" onClick={addAuthority}>Add Another Authority</button>
                </div>          
                <div className='generate-btn'>
                <button type="submit">Generate ID</button>
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

export default ExternalLetter;