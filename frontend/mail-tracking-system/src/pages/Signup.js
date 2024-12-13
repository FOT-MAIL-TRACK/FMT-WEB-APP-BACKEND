import React, {useState} from 'react';
import axios from 'axios';
import NavBar from  '../components/NavBar';
import './Signup.css';
import {Link, useNavigate} from 'react-router-dom';

const Signup= () => {
    const navigate = useNavigate();
    // const [formData,setformData] = useState({
    //     name: '',
    //     username:'',
    //     email:'',
    //     role:'',
    //     faculty:'',
    //     password:'',
    // });

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [faculty, setFaculty] = useState();
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [password, setPassword] = useState();

    const facultyDepartmentMap = {
        "FOT": ['ICT', 'BST', 'MMT', 'SFT', 'CET'],
        "FMSC": ['Accounting', 'Business Administration','Business Economics','Commerce','Decision Sciences','Entrepreneurship','Estate Management and Valuation','Finance','Human Resource Management','Information Technology','Marketing Management','Public Administration'], 
        "FOE": ['Civil Engineering','Computer Engineering','Electrical and Electronic Engineering','Mechanical Engineering','Interdisciplinary Studies'],
        "FHSS": ['Anthropology','Criminology and Criminal Justice','Economics','English and Linguistics','English Language Teaching','Geography','History and Archaeology','Information & Communication Technology','Languages, Cultural Studies and Performing Arts','Music and Creative Technology','Pali and Buddhist Studies','Philosophy and Psychology','Political Science','Sinhala and Mass Communication','Social Statistics','Sociology'],
        "FAHS": ['Nursing and Midwifery','Pharmacy and Pharmaceutical Sciences','Medical Laboratory Sciences','Basic Sciences','Optometry'],
        "FAS": ['Botany','Computer Science','Food Science and Technology','Physics','Sports Science','Zoology','Chemistry','Forestry and Environmental Sciences','Mathematics','Polymer Science','Statistics','Genetics and Molecular Biology Unit'],
        "FMS": ['Anatomy','Biochemistry','Community Medicine','Family Medicine','Forensic Medicine','Immunology & Molecular Medicine','Medical Education','Medicine','Microbiology','Obstetrics & Gynaecology','Paediatrics','Parasitology','Pathology','Pharmacology','Physiology','Psychiatry','Surgery'],
        "FDS": ['Basic Sciences','Community Dental Health','Comprehensive & Geriatric Dentistry','Oral Medicine & Periodontology','Oral Pathology','Oral Surgery','Paraclinical Sciences','Prosthodontics','Restorative Dentistry'],
        "FUAB": ['Urban Bioresources','Aquatic Bioresources','Multidisciplinary Studies'],
        "FOC": ['Information Systems Engineering and Informatics','Knowledge Engineering and Communication','Scientific Computing'],
        "Postal Department" : [],
        "General Administration": [],
    };


    const handleFacultyChange = (e) => {
        const selectedFaculty = e.target.value;
        setFaculty(selectedFaculty);
        setDepartments(facultyDepartmentMap[selectedFaculty] ||[]);
    }
   

    // const handleChange = (e) => {
    //     setformData({...formData, [e.target.name]: e.target.value});
    // }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const payload = {
            name,
            username,
            email,
            role,
            faculty,
            department: role === "FacultyMA" || role === "Technical Officer" ? null : department,
            password,
        };
        
        console.log('Payload being sent:', payload);
        
        try {
            const response = await axios.post("http://localhost:5001/api/users/signup", payload);
            console.log('User registered successfully:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Backend error response:', error.response);
            alert(error.response?.data?.message || 'Error in registration');
        }
        
}

    return(
    <>
    <NavBar />
    <div className="signup-conatiner">
        <div className="container">
            <div className='signup'>
            <h1 className='signup-h1'>Sign Up</h1>
            </div>
            <p className='detail-p'>Please Enter details to create an account. </p>

            <form onSubmit={handleSubmit}>
                <label>
                    <h1>Name</h1>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Enter your name" 
                        // value={formData.name}
                        // onChange={handleChange}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </label>
                <label>
                    <h1>User Name</h1>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Ex: USJP_MAMadura" 
                        // value={formData.username}
                        // onChange={handleChange}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </label>
                <label>
                    <h1>Email</h1>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter your campus email" 
                        // value={formData.email}
                        // onChange={handleChange}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </label>
                <label>
                    <h1>Designation</h1>
                    <select 
                        defaultValue=""
                        // value={formData.role}
                        // onChange={handleChange}
                        onChange={(e) => setRole(e.target.value)}
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
                <label>
                    <h1>Faculty</h1>
                    <select 
                        defaultValue="option1"
                        name="faculty"
                        //onChange={(e) => setFaculty(e.target.value)}
                        onChange={handleFacultyChange}
                        required>
                        <option value="" disabled selected>Choose Faculty</option>
                        {/* <option value="FOT">Faculty of Technology</option>
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
                        <option value="General Administration">General Administration</option> */}
                        {Object.keys(facultyDepartmentMap).map((facultyKey) => (
                            <option key={facultyKey} value={facultyKey}>
                                {facultyKey}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <h1>Department</h1>
                    <select
                        name='department'
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        disabled={role === "FacultyMA" || role === "Technical Officer"}
                    >
                        <option value="" disabled selected>Choose Department</option>
                        { departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                        ))

                        }
                    </select>
                </label>
                <label>
                    <h1>Password</h1>
                    <input 
                        type="password"
                        name="password" 
                        placeholder="........" 
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>       
            <div className='signup-btn'>
            <button type="submit" >Sign Up</button>
            </div> 
            </form> 
            <div className="center-text">
            <p>Already have an account? <Link to="/">Sign in</Link></p>
            </div>
        </div>

    </div>
    </>
    )
}


export default Signup;