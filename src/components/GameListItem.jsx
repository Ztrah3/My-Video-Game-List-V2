import React from 'react';
import Rating from './Rating';

const GameListItem = ({ game, category, handleEditClick, removeGame, rating, setRating }) => {
    return (
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