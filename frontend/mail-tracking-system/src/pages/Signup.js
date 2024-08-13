import React from 'react';
import NavBar from  '../components/NavBar';
import './Signup.css';

const Signup= () => {
    return(
    <>
    <NavBar />
    <div className="signup-conatiner">
        <div className="container">
            <div className='signup'>
            <h1>Sign Up</h1>
            </div>
            <p>Please Enter details to create an account. </p>

            <form>
                <label>
                    <h1>Name</h1>
                    <input type="text" placeholder="Enter your name" required />
                </label>
                <label>
                    <h1>User Name</h1>
                    <input type="text" placeholder="Ex: USJP Madura" required />
                </label>
                <label>
                    <h1>User Name</h1>
                    <input type="email" placeholder="Enter your campus email" required />
                </label>
                <label>
                    <h1>Designation</h1>
                    <select required>
                        <option value="" disabled selected>Choose Designation</option>
                        <option value="lecturer">Lecturer</option>
                        <option value="dean">dean</option>
                        <option value="departmentMA">DepartmentMA</option>
                        <option value="facultyMA">FacultyMA</option>
                    </select>
                </label>
                <label>
                    <h1>Password</h1>
                    <input type="password" placeholder="........" required />
                </label>
                
            </form>
            <button type="submit">Sign Up</button>
            <div className="center-text">
            <p>Already have an account? <a href="/signin">Sign in</a></p>
            </div>
        </div>

    </div>
    </>
    )
}

export default Signup;