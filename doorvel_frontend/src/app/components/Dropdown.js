"use client"
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Dropdown = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            displayEmpty
            sx={{
                borderRadius: 5,
                marginTop: "20px",
                padding: '1px 10px',
                // backgroundColor: '#FFE4C4',
                width: "100%"
            }}
        >
            <MenuItem value="" disabled sx={{
            }}>
                Selecciona una amenidad
            </MenuItem>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
        </Select>
    );
};

export default Dropdown;