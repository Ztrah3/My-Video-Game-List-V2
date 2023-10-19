import React from 'react';

export default function Pagination({ page, handlePreviousClick, handleNextClick }) {
    return (
        <div className="button-container-gen">
            <button className="btn btn-page" onClick={handlePreviousClick}>Previous</button>
            <span className='page-count'>Page {page}</span>
            <button className="btn btn-page" onClick={handleNextClick}>Next</button>
        </div>
    );
}