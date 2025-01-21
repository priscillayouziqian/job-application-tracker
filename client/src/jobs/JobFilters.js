import React from 'react';

const JobFilters = ({ modeFilter, setModeFilter, tempTypeFilter, setTempTypeFilter }) => {
    return (
        <div className="d-flex justify-content-center mb-3">
            <select className='form-select me-2' onChange={(e) => { setModeFilter(e.target.value); }} value={modeFilter}>
                <option value="All">All modes</option>
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
            </select>
            <select className='form-select me-2' onChange={(e) => { setTempTypeFilter(e.target.value); }} value={tempTypeFilter}>
                <option value="All">All types</option>
                <option value="full time">Full Time</option>
                <option value="part time">Part Time</option>
                <option value="contract">Contract</option>
            </select>
        </div>
    );
}

export default JobFilters;