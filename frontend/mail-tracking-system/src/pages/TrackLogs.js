import React, {useState,useEffect}from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import LetterCard from '../components/LetterCard'; // Custom component for each letter
import PaginationComponent from '../components/PaginationComponent'; // Pagination logic
import FilterButtons from '../components/FilterButtons'; // Date, Faculty filters
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './TrackLogs.css';


const TrackLogs = ()=> {
    const [letters , setLetters] = useState([]);
    const [filteredLetters, setFilteredLetters] = useState([]);
    const [currentPage, setCurrentPage]= useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ date: '', faculty: '', department: '', uniqueID: '' , status: '' }); // Default filters
    const registrationNumber = localStorage.getItem('registrationNumber');
    const navigate = useNavigate();


    console.log("Stored registrationNumber:", registrationNumber);


    // useEffect(() => {
    //     if (!registrationNumber || registrationNumber === 'null' || registrationNumber === 'undefined') {
    //         console.error("No registration number found. Please log in.");
    //         navigate('/'); 
    //         return;
    //     }
    //     API call to fetch tracking logs
    //     const fetchLetters = async()=> {
    //     try{
    //         const response = await fetch(`http://localhost:5001/api/letters/letters/${id}`);
    //         const response = await fetch(`http://localhost:5001/api/letters/user/${registrationNumber}`);
    //         const data = await response.json();


    //          Filter data based on selected date
    //          const filteredLetters = data.filter(letter => {
    //             const createdAt = new Date(letter.createdAt); // Assuming createdAt is available
    //             return filters.date ? createdAt.toDateString() === filters.date.toDateString() : true;
    //         });
    //         console.log("Fetched Data:", data);
    //         setLetters(data); 
    //         setFilteredLetters(data);
    //     }
    //     catch (error) {
    //         console.error("Error fetching letters:", error.message || error);
    //         setLetters([]); 
    //         setFilteredLetters([]);
    //       }
    //     };
    //     fetchLetters();
    // },[registrationNumber, navigate]);
    // console.log(letters)

    useEffect(() => {
        if (!registrationNumber || registrationNumber === 'null' || registrationNumber === 'undefined') {
            console.error("No registration number found. Please log in.");
            navigate('/');
            return;
        }
    
        // API call to fetch tracking logs
        const fetchLetters = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/letters/user/${registrationNumber}`);
                const data = await response.json();
    
                console.log("Fetched Data:", data);

                const totalLetters = data.length;
                setTotalPages(Math.ceil(totalLetters /10));

                const startIndex = (currentPage - 1) * 10;
                const endIndex = Math.min(currentPage * 10, totalLetters);
                const lettersForCurrentPage = data.slice(startIndex,endIndex);
    
                // Apply filters
                const filteredLetters = lettersForCurrentPage.filter((letter) => {
                    const matchesFaculty = filters.faculty
                        ? letter.receiver?.faculty === filters.faculty
                        : true;
                    const matchesDepartment = filters.department
                        ? letter.receiver?.department === filters.department
                        : true; 

                    const matchesLetterType = filters.uniqueID
                        ? letter.uniqueID.startsWith(filters.uniqueID) 
                        : true;

                    const matchesLetterStatus = filters.status
                        ? letter.status === filters.status
                        : true;
                    return matchesFaculty && matchesDepartment && matchesLetterType && matchesLetterStatus;
                });


    
                setLetters(filteredLetters); // Set filtered letters
            } catch (error) {
                console.error("Error fetching letters:", error.message || error);
                setLetters([]); // Clear letters on error
            }
        };
    
        fetchLetters();
    }, [registrationNumber, navigate, filters, currentPage]); // Re-run useEffect when filters change    

   

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
            <Typography variant="h4" gutterBottom  marginTop= '20px' align='center'>
            Send/Received letters
            </Typography>
            <FilterButtons setFilters={setFilters} />
            
            {letters.length > 0 ? (
            letters.map((letter) => (
            <LetterCard key={letter.uniqueID} letter={letter} />
        ))
        ) : (
        <Typography>No letters found for the selected filters.</Typography>
        )}

                <PaginationComponent
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
        </div>
        <div style={{ marginTop: '80px' }}> 
        <Footer/>
        </div>
        </>
    )
    
}

export default TrackLogs;