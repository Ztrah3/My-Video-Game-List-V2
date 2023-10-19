import React from 'react';

const Rating = ({ value, game, setRating }) => {
    const handleChange = (event) => {
        setRating(prevRating => ({ ...prevRating, [game.id]: event.target.value }));
    };

    return (
        <select className='rating' value={value} onChange={handleChange}>
            {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                    {i + 1 + '/10'}
                </option>
            ))}
        </select>
    );
};

export default Rating;