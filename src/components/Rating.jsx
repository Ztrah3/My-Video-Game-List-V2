const Rating = ({ value, game, setRating }) => {
    // Function to handle the change event of the select element
    const handleChange = (event) => {
        setRating(prevRating => ({ ...prevRating, [game.id]: event.target.value }));
    };

    // Render a select element with options for each rating from 1 to 10
    // The value of the select element is the current rating
    // The handleChange function is called when the value of the select element changes
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