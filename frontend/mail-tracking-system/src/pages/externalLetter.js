import React from 'react';
import './externalLetter.css';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';


const ExternalLetter = () => {
    return(
        <>
        <RealNavBar />
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
            
            <form className='form-letter'>
            <label className='sender-name'>
                <h2 className='label-h2'>Sender's name</h2>
                <input type="text" placeholder="Enter sender's name" required />
            </label>
            <label className='sender-address'>
                <h2 className='label-h2'>Sender's address</h2>
                <input type="text" placeholder="Enter sender's address" required />
            </label>
            <h2 >Receiver's information</h2>
            <label className='receiver-reg'>
                <h2 className='label-h2'>Registration number</h2>
                <input type="text" placeholder="Enter sender's name" required />
            </label>
            <label className='receiver-designation'>
                <h2 className='label-h2'>Designation</h2>
                <select required>
                        <option value="" disabled selected>Choose Designation</option>
                        <option value="lecturer">Lecturer</option>
                        <option value="dean">dean</option>
                        <option value="departmentMA">DepartmentMA</option>
                        <option value="facultyMA">FacultyMA</option>
                </select>
            </label>
            <label className='receiver-fac'>
                <h2>Faculty</h2>
                <select required>
                        <option value="" disabled selected>Choose Faculty</option>
                        <option value="lecturer">FOT</option>
                        <option value="dean">FMSC</option>
                        <option value="departmentMA">FOE</option>
                        <option value="facultyMA">FHSS</option>
                        <option value="facultyMA">FAS</option>
                        <option value="facultyMA">FAHS</option>
                        <option value="facultyMA">FDS</option>
                        <option value="facultyMA">FUAB</option>
                        <option value="facultyMA">FOC</option>
                        <option value="facultyMA">FMS</option>
                        <option value="facultyMA">FGS</option>
                </select>
            </label>
            <label className='receiver-dept'>
                <h2>Department</h2>
                <select required>
                        <option value="" disabled selected>Choose Department</option>
                        <option value="lecturer">ICT</option>
                        <option value="dean">BST</option>
                        <option value="departmentMA">MMT</option>
                        <option value="facultyMA">SFT</option>
                        <option value="facultyMA">CET</option>
                </select>
            </label>
            </form>
            
            <div className='generate-btn'>
                <button type='submit'>Generate ID</button>
            </div>
            </div>
            </div>
        <Footer/>
        </>
    )
}   

export default ExternalLetter;