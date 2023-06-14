"use client"
import { useState, useEffect, useContext } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AmmenitiesContext } from './AmmenitiesContext';

const apiResponse = {
    "data": [
        {
            "id": 1,
            "property_category_id": 1,
            "name": "Estilo de vida",
            "seo_friendly": "estilo-de-vida",
            "active_record": true,
            "created_at": "2022-04-15T18:32:29.939524",
            "updated_at": "2022-04-15T18:32:29.939534",
            "created_by": "Doorvel-TI"
        },
        {
            "id": 2,
            "property_category_id": 1,
            "name": "Impacto ambiental",
            "seo_friendly": "impacto-ambiental",
            "active_record": true,
            "created_at": "2022-04-15T18:35:46.426587",
            "updated_at": "2022-04-15T18:35:46.426595",
            "created_by": "Doorvel-TI"
        }
    ],
    "date_recived": {}
}

const ParentAmmenitiesDropdown = () => {
    const [selectedParent, setSelectedParent] = useState({ id: 1, name: "Estilo de vida" });
    const [apiData, setApiData] = useState()

    const { ammenitiesOptions, setAmmenitiesOptions } = useContext(AmmenitiesContext)

    const handleChange = (event) => {
        setSelectedParent(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://54.215.118.180:81/api/cat-amenities-parents/');
                const jsonData = await response.json();
                console.log(jsonData)
                setApiData(jsonData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <AmmenitiesContext.Provider value={{ selectedParent }}>
            <Select
                value={selectedParent}
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
                {apiResponse.data.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </AmmenitiesContext.Provider>
    );
};

export default ParentAmmenitiesDropdown;