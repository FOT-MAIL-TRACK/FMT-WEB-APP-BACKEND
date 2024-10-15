import React from 'react';
import { Button } from '@mui/material';

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="pagination">
            <Button 
                onClick={handlePrevious} 
                disabled={currentPage === 1}
                variant="contained"
                color="primary"
            >
                Previous Page
            </Button>
            <Button 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
                variant="contained"
                color="primary"
            >
                Next Page
            </Button>
        </div>
    );
};

export default PaginationComponent;
