import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [password, setPassword] = useState('');

  const facultyDepartmentMap = {
      "Administration": [
          "Registrar / VC", "Academic Establishment", "Non Academic Establishment", "Finance",
          "ASAP / Exam", "General Admin", "Legal", "Capital Works", "EIS", "Supply & Stores",
          "AHEAD", "Int. Audit", "Gvt. Audit", "Proctors", "Staff Development",
          "Student Welfare", "Library", "LIBD", "IT Centre", "Career Guidance"
      ],
      "FOT": [
          "Technology Faculty"
      ],
      "FMSC": [
          "Deans Office", "Accounting", "Decision Science", "Finance", "Commerce",
          "Marketing Management", "Business Administration", "Business Economics",
          "Estate Management", "ITRC / Business Com / Legal Studies", "Public Administration",
          "HRM", "Entrepreneurship", "ICT - MGT", "Business Linkage", "MBA / MSC"
      ],
      "FMS": [
          "Deans Office", "Pharmacology", "Paediatrics", "Family Medicine", "Pathology", "Micro Biology",
          "Parasitology", "Medicine", "Bio Chemistry", "Community Medicine",
          "OB & GYN", "Physiology", "Immunology & Molecular Medicine",
          "Psychology", "Surgery", "Medical Education", "Anatomy",
          "Nursing", "Forensic Medicine"
      ],
      "FAS": [
          "Deans Office", "Botany", "Sports Science", "Food", "Statistics / Computer Science", "Physics",
          "Forestry", "Mathematics", "Physical Education", "Zoology", "Chemistry",
          "Instrument / Polymer", "Molecular Biology"
      ],
      "FHSS": [
          "Deans Office", "Sinhala", "Geography", "Social Statistics", "ICT", "Pali Buddhist",
          "Languages & Culture", "Economics", "Political Science", "Philosophy / Psychology",
          "History & Archaeology", "Sociology & Anthropology", "DELT", "English",
          "Criminology", "Music", "Art IT"
      ],
      "FAHS": [
          "Allied Health Sciences"
      ],
      "FGS": [
          "PhD"
      ],
      "FOE": [
          "Engineering Faculty"
      ],
      "Dental": [
          "Dental Faculty"
      ],
      "FUAB": [
          "Urban & Aquatic Faculty"
      ],
      "FOC": [
          "Computing Faculty"
      ],
      "Postal Department": [
          "Postal Department"
      ]
  };

  const handleFacultyChange = (e) => {
    const selectedFaculty = e.target.value;
    setFaculty(selectedFaculty);
    setDepartments(facultyDepartmentMap[selectedFaculty] || []);
  };

  const handleSubmit = async (e) => {
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

    try {
      const response = await axios.post("http://localhost:5001/api/users/signup", payload);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Error in registration');
    }
  };

  return (
    <>
      <NavBar />
      <div className="signin-container">
        <div className="right-section">
          <h2 className="title">Sign Up</h2>
          <p className="subtitle">Enter your details to create an account</p>
          <form onSubmit={handleSubmit} className="signin-form">
            <label>Name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
            </label>

            <label>User Name
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ex: USJP_MAMadura" required />
            </label>

            <label>Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your campus email" required />
            </label>

            <label>Designation
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="" disabled>Choose Designation</option>
                <option value="Dean">Dean</option>
                <option value="Department Head">Department Head</option>
                <option value="Lecturer">Lecturer</option>
                <option value="PostalDepartmentMA">Postal Department MA</option>
                <option value="FacultyMA">Faculty MA</option>
                <option value="DepartmentMA">Department MA</option>
                <option value="WorkAid">Work Aid</option>
                <option value="Super Admin">Admin</option>
                <option value="Technical Officer">Technical Officer</option>
                <option value="Demonstrator">Demonstrator</option>
              </select>
            </label>

            <label>Faculty
              <select value={faculty} onChange={handleFacultyChange} required>
                <option value="" disabled>Choose Faculty</option>
                {Object.keys(facultyDepartmentMap).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </label>

            <label>Department
              <select value={department} onChange={(e) => setDepartment(e.target.value)} disabled={role === "FacultyMA" || role === "Technical Officer"}>
                <option value="" disabled>Choose Department</option>
                {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>
            </label>

            <label>Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
            </label>

            <button type="submit" className="signin-btn">Sign Up</button>
          </form>
          <p className="signup-text">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
