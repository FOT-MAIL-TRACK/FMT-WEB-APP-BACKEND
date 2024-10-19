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
    const [password, setPassword] = useState();

   

    // const handleChange = (e) => {
    //     setformData({...formData, [e.target.name]: e.target.value});
    // }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5001/api/users/signup",{name,username,email,role,faculty,password})
            try{
            if(response.status === 201){
                    console.log('User registered successfully');
                    navigate('/signin');
                }
            }
            catch (error){
                console.error('There was an error!', error);
                alert(error.response.data.message || 'Error in registration');
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
                        defaultValue="option1"
                        name="role"
                        // value={formData.role}
                        // onChange={handleChange}
                        onChange={(e) => setRole(e.target.value)}
                        required>
                        <option value="option1">Choose Designation</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Dean">Dean</option>
                        <option value="Department Head">Department Head</option>
                        <option value="PostalDepartmentMA">PostalDepartmentMA</option>
                        <option value="FacultyMA">FacultyMA</option>
                        <option value="DepartmentMA">DepartmentMA</option>
                        <option value="admin">Admin</option>
                        <option value="Technial Officer">Technial Officer</option>
                        <option value="Demonstrator">Demonstrator</option>
                        <option value="Workaid">WorkAid</option>
                    </select>
                </label>
                <label>
                    <h1>Faculty</h1>
                    <select 
                        defaultValue="option1"
                        name="faculty"
                        onChange={(e) => setFaculty(e.target.value)}
                        required>
                        <option value="option1" >Choose Faculty</option>
                        <option value="Faculty of Technology">FOT</option>
                        <option value="Faculty of Management and Studies">FMSC</option>
                        <option value="Faculty of Engineering">FOE</option>
                        <option value="FHS">FHS</option>
                        <option value="Postal Department">Postal Department</option>
                    </select>
                </label>
                <label>
                    <h1>Password</h1>
                    <input 
                        type="password"
                        name="password" 
                        placeholder="........" 
                        // value={formData.password}
                        // onChange={handleChange}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>       
            <div className='signup-btn'>
            <button type="submit" >Sign Up</button>
            </div> 
            </form> 
            <div className="center-text">
            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            </div>
        </div>

    </div>
    </>
    )
}


export default Signup;