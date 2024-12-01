import React from 'react';
import { createTheme, ThemeProvider, Button } from '@mui/material';

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
    const theme = createTheme({
        palette: {
            customRed: {
                main: '#a1232b',
                contrastText: '#fff',
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
        <ThemeProvider theme={theme}>
            <Button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                variant="contained"
                color="customRed"
                sx={{
                    fontSize: '1.1rem', 
                    padding: '10px 20px', 
                    marginLeft: '20px',
                    height: '40px', 
                }}
            >
                Previous Page
            </Button>
            
                <Button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    variant="contained"
                    color="customRed"
                    sx={{
                        fontSize: '1.1rem', 
                        padding: '10px 40px', 
                        height: '40px', 
                        marginLeft: '20px', 
                    }}
                >
                    Next Page
                </Button>
            </ThemeProvider>
        </div>
    );
};

export default PaginationComponent;
