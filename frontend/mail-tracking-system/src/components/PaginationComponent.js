import React from 'react';
import { createTheme, ThemeProvider, Button } from '@mui/material';

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {


    const theme = createTheme({
        palette: {
          customRed: {
            main: '#a1232b', // Define the custom color’s main value
            contrastText: '#fff', // Text color when using the button
          },
        },
      });

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
         <ThemeProvider theme={theme}>
            <Button 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
                variant="contained"
                color="customRed"
            >
                Next Page
            </Button>
            </ThemeProvider>
        </div>
    );
};

export default PaginationComponent;
