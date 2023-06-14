import { useEffect, useState } from 'react';

import ParentAmenitiesDropdown from './ParentAmmenitiesDropdown';
import Navbar from './Navbar'
import ChildrenAmmenitiesList from './ChildrenAmmenitiesList'

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

export default function Home() {
    const [ammenitiesOptions, setAmmenitiesOptions] = useState(apiResponse.data.map((item) => (
        { id: item.id, name: item.name }
    )))

    return (
        <AmmenitiesContext.Provider value={{ ammenitiesOptions }}>
            <Navbar />
            <ParentAmenitiesDropdown />
            <ChildrenAmmenitiesList />
        </AmmenitiesContext.Provider>
    );
}