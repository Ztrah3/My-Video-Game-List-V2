import GameCard from './GameCard';


// GameList component
export default function GameList({ games, handleGameClick }) {
    return (
        // Render a div that contains a list of GameCard components
        // Each GameCard component is passed a game object and the handleGameClick function as props
        <div className="games-container">
            {games.map((game) => (
                <GameCard game={game} handleGameClick={handleGameClick} />
            ))}
        </div>
    );
};