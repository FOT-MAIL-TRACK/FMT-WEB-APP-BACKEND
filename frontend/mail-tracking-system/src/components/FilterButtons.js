import React, { useState } from 'react';
import { createTheme, ThemeProvider, Button, MenuItem, Select, Box, TextField, InputLabel, FormControl } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';

const FilterButtons = ({ setFilters }) => {

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedLetterType, setSelectedLetterType] = useState('');

    const facultieswithDepartments = {
        FOT: ['ICT', 'BST', 'MMT', 'SFT', 'CET'],
        FMSC: ['Department1', 'Department2'],
        FOE: ['Department3', 'Department4'],
        FHSS: ['Department5', 'Department6']
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? date.toISOString().split('T')[0] : null;
        setFilters((prev) => ({ ...prev, date: formattedDate })); // Pass the date as an ISO string
    };
    

    const handleFacultyChange = (e) => {
        const selectedFaculty = e.target.value;
        setSelectedFaculty(selectedFaculty);
        setSelectedDepartment(''); // Clear department selection when faculty changes
        setFilters((prev) => ({ ...prev, faculty: selectedFaculty })); // Update faculty filter
    };

    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        setSelectedDepartment(selectedDepartment);
        setFilters((prev) => ({ ...prev, department: selectedDepartment })); // Update department filter
    };

    const handleLetterTypeChange = (e) => {
        const selectedLetterType = e.target.value;
        setSelectedLetterType(selectedLetterType);
        setFilters((prev) => ({ ...prev, uniqueID: selectedLetterType }));
    }

    const handleClearFilters = () => {
        setSelectedDate(null);
        setSelectedFaculty('');
        setSelectedDepartment('');
        setSelectedLetterType(''); 
        setFilters({ date: null, faculty: '', department: '',uniqueID: ''  }); // Reset all filters
    };

    const theme = createTheme({
        palette: {
            customRed: {
                main: '#a1232b', // Define the custom color’s main value
                contrastText: '#fff', // Text color when using the button
            },
        },
    });

    return (
        <div className="filters">
            <Box 
                display="flex" 
                justifyContent="start" 
                gap={2} 
                p={2} 
                boxShadow='0px 4px 10px rgba(161, 35, 43, 0.2)' 
                borderRadius={2} 
                bgcolor="background.paper"
            >
                <ThemeProvider theme={theme}>
                    <Button 
                        variant="contained" 
                        color="customRed"
                        onClick={() => setFilters((prev) => ({ ...prev, sortBy: 'date' }))}
                    >
                        By Date
                    </Button>
                </ThemeProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params}
                        slots={{ textField: TextField }}
                         />}
                    />
                </LocalizationProvider>

                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel htmlFor="faculty-select">Select Faculty</InputLabel>
                <Select  
                    name="faculty" 
                    value={selectedFaculty}
                    onChange={handleFacultyChange}
                    variant="outlined"
                    label="Select Faculty"
                    // sx={{ minWidth: 150 }}
                >
                    <MenuItem value="FOT">FOT</MenuItem>
                    <MenuItem value="FMSC">FMSC</MenuItem>
                    <MenuItem value="FOE">FOE</MenuItem>
                    <MenuItem value="FHSS">FHSS</MenuItem>
                </Select>
                </FormControl>

                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel htmlFor="faculty-select">Select Department</InputLabel>
                <Select 
                    name="department" 
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    variant="outlined"
                    sx={{ minWidth: 150 }}
                    disabled={!selectedFaculty}
                >
                    
                    {selectedFaculty &&
                        facultieswithDepartments[selectedFaculty].map((department) => (
                            <MenuItem key={department} value={department}>
                                {department}
                            </MenuItem>
                        ))
                    }
                </Select>
                </FormControl>
                
                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel >Letter Type</InputLabel>
                <Select
                    name="uniqueID"
                    value={selectedLetterType}
                    onChange={handleLetterTypeChange}
                    variant="outlined"
                    sx={{ minWidth: 150}}
                >
                    <MenuItem value="EXT">External</MenuItem>
                    <MenuItem value="INT">Internal</MenuItem>
                </Select>
                </FormControl>

                <ThemeProvider theme={theme}>
                <Button
                    variant="contained" 
                    color="customRed"
                    onClick={handleClearFilters}
                    sx={{ alignSelf: 'center' }}
                >
                    Clear Filters
                </Button>
                </ThemeProvider>
            </Box>
        </div>
    );
}

export default FilterButtons;
