import React from 'react';

export default function GameCard({ game, handleGameClick }) {
    return (
        <div className="game-card" key={game.id} onClick={() => handleGameClick(game)}>
            <h4>{game.name}</h4>
            <img className='game-image' src={game.image_background} alt={game.name} />
        </div>
    );
}