import React, {useState,useEffect}from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import LetterCard from '../components/LetterCard'; // Custom component for each letter
import PaginationComponent from '../components/PaginationComponent'; // Pagination logic
import FilterButtons from '../components/FilterButtons'; // Date, Faculty filters


const TrackLogs = ()=> {
    const [letters , setLetters] = useState([]);
    const [currentPage, setCurrentPage]= useState();
    const [filters, setFilters] = useState({ date: '', faculty: '' }); // Default filters

    useEffect(() => {
        // API call to fetch tracking logs
        const fetchLetters =async()=> {
        try{
            //const response = await fetch(`http://localhost:5001/api/letters/letters/${id}`);
            const response = await fetch('http://localhost:5001/api/letters/letters');
            const data = await response.json();
            console.log("Fetched Data:", data);
            setLetters(data.letters || []); 
        }
        catch (error) {
            console.error("Error fetching letters:", error);
          }
        }
        fetchLetters();
    },[currentPage, filters]);


    return(
        <>
        <RealNavBar />
        <div style={{ marginTop: '100px' }}> 
        <NavBar/> 
        </div>
        <div>
            <h2>Past 30 Days</h2>
            <FilterButtons setFilters={setFilters} />
            
            {letters.length === 0 ? (
            <p>No letters found.</p>
            ) : (
            letters.map(letter => (
            <LetterCard letter={letter} key={letter.uniqueId} />
            ))      
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