export default function GameCard({ game, handleGameClick }) {
    return (
         // Render a div that represents a game card
        // The div has an onClick handler that calls the handleGameClick function with the game as an argument
        // Inside the div, render the game's name and an image with the game's background image
        <div className="game-card" key={game.id} onClick={() => handleGameClick(game)}>
            <h4>{game.name}</h4>
            <img className='game-image' src={game.image_background} alt={game.name} />
        </div>
    );
}