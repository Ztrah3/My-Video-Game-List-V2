import Rating from './Rating';

// GameListItem component
const GameListItem = ({ game, category, handleEditClick, removeGame, rating, setRating }) => {
    return (
        // Render a list item that represents a game
        // The list item contains an image, the game's name, a Rating component, and Edit and Delete buttons
        // The Edit button calls the handleEditClick function with the game and category as arguments
        // The Delete button calls the removeGame function with the game's timestamp as an argument
        <li className="list-item" key={game.timestamp}>
            <img className="game-images" src={game.image_background} alt={game.name} />
            <label>
                <h2>{game.name}</h2>
            </label>
            <h4>Rating:</h4>
            <Rating key={game.rating} value={rating[game.id]} game={game} setRating={setRating} />
            <button className="btn btn-edit" onClick={() => handleEditClick(game, category)}>Edit</button>
            <button className='btn btn-danger' onClick={() => removeGame(game.timestamp)}>Delete</button>
        </li>
    );
};

export default GameListItem;