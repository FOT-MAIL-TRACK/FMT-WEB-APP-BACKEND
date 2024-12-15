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
    const [senfaculty, setSenFaculty] = useState('');
    const [sendepartment, setSenDepartment] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverRegno, setReceiverRegNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [recfaculty, setRecFaculty] = useState('');
    const [recdepartment, setRecDepartment] = useState('');
    const [uniqueID, setUniqueID] = useState(null);
    const [open, setOpen] = useState(false);
    const [authorities, setAuthorities] = useState([{ name: '', role: '' }]);
    // const [departments, setDepartments] = useState([]);

    // const facultyDepartmentMap = {
    //     "FOT": ['ICT', 'BST', 'MMT', 'SFT', 'CET'],
    //     "FMSC": ['Accounting', 'Business Administration','Business Economics','Commerce','Decision Sciences','Entrepreneurship','Estate Management and Valuation','Finance','Human Resource Management','Information Technology','Marketing Management','Public Administration'], 
    //     "FOE": ['Civil Engineering','Computer Engineering','Electrical and Electronic Engineering','Mechanical Engineering','Interdisciplinary Studies'],
    //     "FHSS": ['Anthropology','Criminology and Criminal Justice','Economics','English and Linguistics','English Language Teaching','Geography','History and Archaeology','Information & Communication Technology','Languages, Cultural Studies and Performing Arts','Music and Creative Technology','Pali and Buddhist Studies','Philosophy and Psychology','Political Science','Sinhala and Mass Communication','Social Statistics','Sociology'],
    //     "FAHS": ['Nursing and Midwifery','Pharmacy and Pharmaceutical Sciences','Medical Laboratory Sciences','Basic Sciences','Optometry'],
    //     "FAS": ['Botany','Computer Science','Food Science and Technology','Physics','Sports Science','Zoology','Chemistry','Forestry and Environmental Sciences','Mathematics','Polymer Science','Statistics','Genetics and Molecular Biology Unit'],
    //     "FMS": ['Anatomy','Biochemistry','Community Medicine','Family Medicine','Forensic Medicine','Immunology & Molecular Medicine','Medical Education','Medicine','Microbiology','Obstetrics & Gynaecology','Paediatrics','Parasitology','Pathology','Pharmacology','Physiology','Psychiatry','Surgery'],
    //     "FDS": ['Basic Sciences','Community Dental Health','Comprehensive & Geriatric Dentistry','Oral Medicine & Periodontology','Oral Pathology','Oral Surgery','Paraclinical Sciences','Prosthodontics','Restorative Dentistry'],
    //     "FUAB": ['Urban Bioresources','Aquatic Bioresources','Multidisciplinary Studies'],
    //     "FOC": ['Information Systems Engineering and Informatics','Knowledge Engineering and Communication','Scientific Computing'],
    //     "Postal Department" : [],
    //     "General Administration": [],
    // };

    // const handleFacultyChange = (e) => {
    //     const selectedFaculty = e.target.value;
    //     setSenFaculty(selectedFaculty);
    //     setDepartments(facultyDepartmentMap[selectedFaculty] || []);
    // };

    const handleSenderRegNoChange = async (e) => {
        const registrationNumber = e.target.value;
        setSenderRegNo(registrationNumber);
        try{
            const response = await axios.get(`http://localhost:5001/api/users/users/${registrationNumber}`);
            if(response.status === 200){
                setSenderName(response.data.name);
                setSenFaculty(response.data.faculty);
                setSenDepartment(response.data.department);
            }
            else{
                setSenderName("");
                setSenFaculty("");
                setSenDepartment("");
            }
        }
        catch (error){
            console.error("Error fetching user data:", error);
            setSenderName("");
            setSenFaculty("");
            setSenDepartment("");
        }
    };

    const handleReceiverRegNoChange = async (e) => {
        const registrationNumber = e.target.value;
        setReceiverRegNo(registrationNumber);

        try{
            const response = await axios.get(`http://localhost:5001/api/users/users/${registrationNumber}`);
            if(response.status === 200){
                setReceiverName(response.data.name);
                setDesignation(response.data.role);
                setRecFaculty(response.data.faculty);
                setRecDepartment(response.data.department);
                console.log("Receiver", response.data)
            }else {
                setReceiverName("");
                setDesignation("");
                setRecFaculty("");
                setRecDepartment("");
            }

        }
        catch(error){
            console.error("Error fetching user data:", error);
            setReceiverName("");
            setDesignation("");
            setRecFaculty("");
            setRecDepartment("");
        }
    }


    const handleSubmit = async (e) => {
    e.preventDefault();
        const letterData = {
            sender : {
                name : senderName,
                registrationNumber: senderRegno,
                address : senderAddress,
                faculty : senfaculty,
                department : sendepartment,
            },
            receiver : {
                name : receiverName,
                registrationNumber : receiverRegno,
                receiverRole : designation,
                authorities: authorities,
                faculty: recfaculty,
                department : recdepartment,
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

    const handleAuthorityChange = (index, field, value) => {
        const newAuthorities = [...authorities];
        newAuthorities[index][field] = value;
        setAuthorities(newAuthorities);
    };
    
    const addAuthority = () => {
        setAuthorities([...authorities, {registrationNumber: '', name: '',  role: '' }]);
    };
    
    const removeAuthority = (index) => {
        const newAuthorities = authorities.filter((_, i) => i !== index);
        setAuthorities(newAuthorities);
    };
    
 
    return(
        <>
            <RealNavBar/>
            <div style={{ marginTop: '100px' }}> 
            <NavBar />
             </div>

            <div className='in-lettercontainer'>
            <div className='container-ex'>
            <div className='content-ex'>
            <h2>Enter letter/parcel information</h2>
            </div>
            <div className='content-sender'>
            <h1>Sender's information</h1>
            </div>
            
            <form 
            className='form-letter'
            onSubmit={handleSubmit} >
                <label className='sender-regno'>
                    <h2 className='label-h2'>Sender's registration number</h2>
                    <input type="text" 
                    placeholder="Enter sender's registration number" 
                    value={senderRegno}
                    //onChange={(e) => setSenderRegNo(e.target.value)}
                    onChange={handleSenderRegNoChange}
                    required />
                </label>
                <label className='sender-name'>
                    <h2 className='label-h2'>Sender's name</h2>
                    <input type="text" 
                    placeholder="Enter sender's name" 
                    value= {senderName}
                    // onChange={(e) => setSenderName(e.target.value)}
                    readOnly
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
                <label className='sender-faculty'>
                    <h2 className='label-h2'>Sender's faculty</h2>
                    <select
                         value={senfaculty}
                        //  onChange={(e) => setSenFaculty(e.target.value)}
                        onChange={handleSenderRegNoChange}
                        required
                    >
                    <option value="" disabled selected>Choose Faculty</option>
                        <option value="FOT">Faculty of Technology</option>
                        <option value="FMSC">Faculty of Management Studies and Commerce</option>
                        <option value="FOE">Faculty of Engineering</option>
                        <option value="FHSS">Faculty of Humanities and Social Sciences</option>
                        <option value="FAHS">Faculty of Applied Sciences</option>
                        <option value="FAS">Faculty of Allied Health Sciences</option>
                        <option value="FMS">Faculty of Medical Sciences</option>
                        <option value="FDS">Faculty of Dental Sciences</option>
                        <option value="FAUB">Faculty of Urban and Aquatic Bioresources</option>
                        <option value="FOC">Faculty of Computing</option>
                        <option value="Postal Department">Postal Department</option>
                        <option value="General Administration">General Administration</option>
                    </select>
                </label>
                <label className='sender-dept'>
                <h2>Sender's department</h2>
                <input 
                    value={sendepartment}
                    placeholder='department'
                    // onChange={(e) => setSenDepartment(e.target.value)}
                    readOnly
                    required
                />     
                </label>
                <div style={{ marginTop: '50px' }}> 
                </div>
                <h1 >Receiver's information</h1>
                <label className='receiver-reg'>
                    <h2 className='label-h2'>Registration number</h2>
                    <input type="text" 
                    placeholder="Enter receiver's registration number"
                    value={receiverRegno}
                    onChange={handleReceiverRegNoChange}
                    required />
                </label>
                <label className='receiver-name'>
                    <h2 className='label-h2'>Receiver's name</h2>
                    <input type="text" 
                    placeholder="Enter receiver's name" 
                    value={receiverName}
                    readOnly
                    required />
                </label>
                <label className='receiver-designation'>
                    <h2 className='label-h2'>Designation</h2>
                    <select 
                    value={designation}
                    // onChange={(e) => setDesignation(e.target.value)}
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
                        <option value="Admin">Admin</option>
                        <option value="Technical Officer">Technial Officer</option>
                        <option value="Demonstrator">Demonstrator</option>
                    </select>
                </label>
                <label className='receiver-fac'>
                    <h2>Receiver's faculty</h2>
                    <select 
                    value={recfaculty}
                    //onChange={(e)=> setRecFaculty(e.target.value)}
                    // onChange={handleFacultyChange}
                    onChange={handleReceiverRegNoChange}
                    required>
                        <option value="" disabled selected>Choose Faculty</option>
                        <option value="FOT">Faculty of Technology</option>
                        <option value="FMSC">Faculty of Management Studies and Commerce</option>
                        <option value="FOE">Faculty of Engineering</option>
                        <option value="FHSS">Faculty of Humanities and Social Sciences</option>
                        <option value="FAHS">Faculty of Applied Sciences</option>
                        <option value="FAS">Faculty of Allied Health Sciences</option>
                        <option value="FMS">Faculty of Medical Sciences</option>
                        <option value="FDS">Faculty of Dental Sciences</option>
                        <option value="FAUB">Faculty of Urban and Aquatic Bioresources</option>
                        <option value="FOC">Faculty of Computing</option>
                        <option value="Postal Department">Postal Department</option>
                        <option value="General Administration">General Administration</option>
                    </select>
                </label>
                <label className='receiver-dept'>
                <h2>Receiver's department</h2>
                <input 
                    value={recdepartment}
                    placeholder="departments"
                    // onChange={(e) => setRecDepartment(e.target.value)}
                    readOnly
                    required
                />       
                </label>
                <div style={{ marginTop: '50px' }}> 
                </div>
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
                             <option value="" disabled selected>Choose Designation</option>
                            <option value="Dean">Dean</option>
                            <option value="Department Head">Department head</option>
                            <option value="Lecturer">Lecturer</option>
                            <option value="PostalDepartmentMA">Postal department MA</option>
                            <option value="FacultyMA">Faculty MA</option>
                            <option value="DepartmentMA">Department MA</option>
                            <option value="WorkAid">Work aid</option>
                            <option value="Admin">Admin</option>
                            <option value="Technical Officer">Technial Officer</option>
                            <option value="Demonstrator">Demonstrator</option>
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