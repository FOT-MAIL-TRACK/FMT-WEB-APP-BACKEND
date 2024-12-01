import React, { useState, useEffect } from 'react';
import FilterButtons from './FilterButtons'; // Assuming the filter component is in the same folder
// Optional, for notifications on success/error

const LettersList = ({ registrationNumber, filters }) => {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const fetchFilteredLetters = async () => {
            const { faculty, department, date, sortBy } = filters;
            
            // Build the query string
            let queryParams = [];
            if (faculty) queryParams.push(`faculty=${encodeURIComponent(faculty)}`);
            if (department) queryParams.push(`department=${encodeURIComponent(department)}`);
            if (date) queryParams.push(`date=${encodeURIComponent(date)}`);
            if (sortBy) queryParams.push(`sortBy=${encodeURIComponent(sortBy)}`);
            
            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const url = `http://localhost:5001/api/letters/user/${registrationNumber}${queryString}`;
            
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setLetters(data); // Update state with the fetched letters
                } 
            } catch (error) {
                console.error('Error fetching letters:', error);
            }
        };

        fetchFilteredLetters();
    }, [filters, registrationNumber]);

    return (
        <div>
            {letters.length > 0 ? (
                <ul>
                    {letters.map((letter) => (
                        <li key={letter._id}>
                            {letter.uniqueID} - {letter.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No letters found.</p>
            )}
        </div>
    );
};

export default LettersList;
