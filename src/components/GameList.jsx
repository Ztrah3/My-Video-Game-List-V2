import React from 'react';
import GameCard from './GameCard';

export default function GameList({ games, handleGameClick }) {
    return (
        <div className="games-container">
            {games.map((game) => (
                <GameCard game={game} handleGameClick={handleGameClick} />
            ))}
        </div>
    );
};