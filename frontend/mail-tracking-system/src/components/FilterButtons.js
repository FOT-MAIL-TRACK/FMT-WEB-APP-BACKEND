import React from 'react';
import { Button, MenuItem, Select } from '@mui/material';

const FilterButtons = ({ setFilters }) => {

    const handleFilterChange =(e)=>{
        setFilters((prev) => ({ ...prev, [e.target.value]: e.target.value}))
    }

    return(
        <div className="filters">
            <Button variant='outlined'>By Date</Button>
            <Select name='faculty' onChange={handleFilterChange}>
                <MenuItem value="FOT">FOT</MenuItem>
                <MenuItem value="FMSC">FMSC</MenuItem>
                <MenuItem value="FOE">FOE</MenuItem>
            </Select>
            <Select name="department" onChange={handleFilterChange}>
                <MenuItem value="ICT">ICT Department</MenuItem>
                <MenuItem value="BST">BST Department</MenuItem>
                <MenuItem value="MMT">MMT Department</MenuItem>
                <MenuItem value="SFT">SFT Department</MenuItem>
                <MenuItem value="CET">CET Department</MenuItem>
            </Select>
        </div>
    )
}

export default FilterButtons;
