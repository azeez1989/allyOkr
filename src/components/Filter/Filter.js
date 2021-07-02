import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ setFilterData }) => {
    const [filter, setFilter] = useState("");

    const filterHandler = (e) => {
        setFilter(e.target.value);
        setFilterData(e.target.value);
    };

    
    return (
        <div className="filter">
            <input type="text" onChange={filterHandler} placeholder="Filter by category......." value={filter} />
        </div>
    );
};

export default Filter;