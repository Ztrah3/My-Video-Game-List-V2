export default function Pagination({ page, handlePreviousClick, handleNextClick }) {
    return (
        // Render a div that contains two buttons and a span
        // The Previous button calls the handlePreviousClick function when clicked
        // The Next button calls the handleNextClick function when clicked
        // The span displays the current page number
        <div className="button-container-gen">
            <button className="btn btn-page" onClick={handlePreviousClick}>Previous</button>
            <span className='page-count'>Page {page}</span>
            <button className="btn btn-page" onClick={handleNextClick}>Next</button>
        </div>
    );
}