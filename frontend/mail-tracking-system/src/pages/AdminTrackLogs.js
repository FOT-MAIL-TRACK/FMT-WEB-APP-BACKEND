import React, { useState, useEffect } from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import LetterCard from '../components/LetterCard'; // Reuse the same card component
import PaginationComponent from '../components/PaginationComponent';
import FilterButtons from '../components/FilterButtons';
import { Typography } from '@mui/material';

const AdminTrackLogs = () => {
    const [letters, setLetters] = useState([]);
    const [filteredLetters, setFilteredLetters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ date: '', faculty: '', department: '', uniqueID: '', status: '' });

    useEffect(() => {
        const fetchLetters = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5001/api/letters/letters`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                
                const lettersData = data.letters || data; // Adjust based on backend response
                setTotalPages(Math.ceil(lettersData.length / 10));
                setLetters(lettersData);
            } catch (error) {
                console.error('Error fetching letters:', error);
                setLetters([]);
            }
        };

        fetchLetters();
    }, []);

    // Filter & pagination logic
    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;

    const lettersForCurrentPage = letters
        .filter((letter) => {
            const matchesFaculty = filters.faculty
                ? letter.receiver?.faculty === filters.faculty || letter.sender?.faculty === filters.faculty
                : true;
            const matchesDepartment = filters.department
                ? letter.receiver?.department === filters.department || letter.sender?.department === filters.department
                : true;
            const matchesLetterType = filters.uniqueID ? letter.uniqueID.startsWith(filters.uniqueID) : true;
            const matchesLetterStatus = filters.status ? letter.status === filters.status : true;

            return matchesFaculty && matchesDepartment && matchesLetterType && matchesLetterStatus;
        })
        .slice(startIndex, endIndex);

    return (
        <>
            <RealNavBar />
            <div style={{ marginTop: '100px' }}>
                <NavBar />
            </div>

            <div>
                <Typography variant="h4" align="center" gutterBottom marginTop="20px">
                    All Letters Track Log 
                </Typography>

                <FilterButtons setFilters={setFilters} />

                {lettersForCurrentPage.length > 0 ? (
                    lettersForCurrentPage.map((letter) => <LetterCard key={letter.uniqueID} letter={letter} />)
                ) : (
                    <Typography align="center" marginTop="20px">No letters found for the selected filters.</Typography>
                )}

                <PaginationComponent
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>

            <div style={{ marginTop: '80px' }}>
                <Footer />
            </div>
        </>
    );
};

export default AdminTrackLogs;
