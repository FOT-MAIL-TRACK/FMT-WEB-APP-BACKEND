import React ,{useState} from 'react';
import { createTheme, ThemeProvider, Button, MenuItem, Select, Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';

const FilterButtons = ({ setFilters }) => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleFilterChange =(e)=>{
        setFilters((prev) => ({ ...prev, [e.target.value]: e.target.value}))
    }

    const handleDateChange =(date) =>{
        setSelectedDate(date);
        setFilters((prev) => ({ ...prev, sortBy: 'date' }))
    }

    const theme = createTheme({
        palette: {
          customRed: {
            main: '#a1232b', // Define the custom color’s main value
            contrastText: '#fff', // Text color when using the button
          },
        },
      });

    return(
        <div className="filters">
        <Box display="flex" justifyContent="start" gap={2} p={2} boxShadow='0px 4px 10px rgba(161, 35, 43, 0.2)' borderRadius={2} bgcolor="background.paper">
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
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            <Select 
            name="faculty" 
            defaultValue=""
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ minWidth: 120 }}
            >
                <MenuItem value="FOT">FOT</MenuItem>
                <MenuItem value="FMSC">FMSC</MenuItem>
                <MenuItem value="FOE">FOE</MenuItem>
            </Select>
            <Select 
            name="department" 
            defaultValue=""
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ minWidth: 150 }}
            >
                <MenuItem value="ICT">ICT Department</MenuItem>
                <MenuItem value="BST">BST Department</MenuItem>
                <MenuItem value="MMT">MMT Department</MenuItem>
                <MenuItem value="SFT">SFT Department</MenuItem>
                <MenuItem value="CET">CET Department</MenuItem>
            </Select>
        </Box>
        </div>
    )
}

export default FilterButtons;
