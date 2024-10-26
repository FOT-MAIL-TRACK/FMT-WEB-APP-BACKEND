import React, {useState,useEffect}from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import LetterCard from '../components/LetterCard'; // Custom component for each letter
import PaginationComponent from '../components/PaginationComponent'; // Pagination logic
import FilterButtons from '../components/FilterButtons'; // Date, Faculty filters
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const TrackLogs = ()=> {
    const [letters , setLetters] = useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const [filters, setFilters] = useState({ date: '', faculty: '' }); // Default filters
    const registrationNumber = localStorage.getItem('registrationNumber');
    const navigate = useNavigate();


    console.log("Stored registrationNumber:", registrationNumber);


    useEffect(() => {
        if (!registrationNumber || registrationNumber === 'null' || registrationNumber === 'undefined') {
            console.error("No registration number found. Please log in.");
            navigate('/signin'); 
            return;
        }
        // API call to fetch tracking logs
        const fetchLetters = async()=> {
        try{
            //const response = await fetch(`http://localhost:5001/api/letters/letters/${id}`);
            const response = await fetch(`http://localhost:5001/api/letters/user/${registrationNumber}`);
            const data = await response.json();
            console.log("Fetched Data:", data);
            setLetters(data); 
        }
        catch (error) {
            console.error("Error fetching letters:", error);
          }
        }
        fetchLetters();
    },[registrationNumber, navigate]);


    return(
        <>
        <RealNavBar />
        <div style={{ marginTop: '100px' }}> 
        <NavBar/> 
        </div>
        <div>
            <Typography variant="h4" gutterBottom align='center' marginTop= '20px'>
            Past 30 Days
            </Typography>
            <div style={{ marginTop: '50px' }}></div>
            <Typography variant="h5" gutterBottom  marginTop= '20px'>
            Your Letters
            </Typography>
            <FilterButtons setFilters={setFilters} />
            
            {letters.length > 0 ? (
                    letters.map((letter) => (
                        <LetterCard 
                            key={letter.uniqueId} 
                            letter={letter} 
                        />
                    ))
            ) : (
                <p>No letters found</p>
            )}
            <PaginationComponent setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
        <div style={{ marginTop: '400px' }}> 
        <Footer/>
        </div>
        </>
    )
    
}

export default TrackLogs;