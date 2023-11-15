import { useState, useEffect } from 'react';
import "../styles/styles.css"

// Modal component
function Modal({ isOpen, onClose, selectedGame, editingGame, setEditingGame, gamesToPlay, setGamesToPlay, currentlyPlaying, setCurrentlyPlaying, finishedGames, setFinishedGames, droppedGames, setDroppedGames }) {
    // State variables
    const [selectedCategory, setSelectedCategory] = useState('gamesToPlay');
    const [gameData, setGameData] = useState(null);

    // useEffect hook to set the game data state when editing a game or adding a new game
    useEffect(() => {
        if (editingGame) {
            setSelectedCategory(editingGame.category);
            setGameData(editingGame); // Set the game data state when editing a game
        } else if (selectedGame) {
            setGameData(selectedGame); // Set the game data state when adding a new game
        }
    }, [editingGame, selectedGame]);

    // If the modal is not open, return null
    if (!isOpen) return null;

    // Function to handle the Add button click
    const handleAddClick = () => {
        // Declare object to add games to list
        const gameToAdd = {
            // Use spread operator to copy all properties from the gameData object into the gameAdd object
            ...gameData,
            // If true use timestamp from editingGame, if false create new current timestamp
            timestamp: editingGame ? editingGame.timestamp : Date.now(),
        };
        // If the game is being moved to a different category, remove it from its current list
        if (editingGame && editingGame.category !== selectedCategory) {
            switch (editingGame.category) {
                case 'gamesToPlay':
                    setGamesToPlay(gamesToPlay.filter(game => game.timestamp !== editingGame.timestamp));
                    break;
                case 'currentlyPlaying':
                    setCurrentlyPlaying(currentlyPlaying.filter(game => game.timestamp !== editingGame.timestamp));
                    break;
                case 'finishedGames':
                    setFinishedGames(finishedGames.filter(game => game.timestamp !== editingGame.timestamp));
                    break;
                case 'droppedGames':
                    setDroppedGames(droppedGames.filter(game => game.timestamp !== editingGame.timestamp));
                    break;
                default:
                    break;
            }
        }

        // Add the game to its new list
        switch (selectedCategory) {
            // Check if `selectedCategory` is equal to one of the game lists
            case 'gamesToPlay':
                // Check if the game to be added already exists in the list.
                if (!gamesToPlay.some(game => game.name === gameToAdd.name)) {
                     // Add the game to the list by creating a new array that contains all the elements of the old array and the new game, then setting the game list state to this new array.
                    setGamesToPlay([...gamesToPlay, gameToAdd]);
                }
                break;
            case 'currentlyPlaying':
                if (!currentlyPlaying.some(game => game.name === gameToAdd.name)) {
                    setCurrentlyPlaying([...currentlyPlaying, gameToAdd]);
                }
                break;
            case 'finishedGames':
                if (!finishedGames.some(game => game.name === gameToAdd.name)) {
                    setFinishedGames([...finishedGames, gameToAdd]);
                }
                break;
            case 'droppedGames':
                if (!droppedGames.some(game => game.name === gameToAdd.name)) {
                    setDroppedGames([...droppedGames, gameToAdd]);
                }
                break;
            default:
                break;
        }

        // Reset the editingGame state and selectedCategory state, and close the modal
        if (editingGame) {
            setEditingGame(null);
        }
        setSelectedCategory('gamesToPlay');
        onClose();
    };

    return (
        // Render the modal
        <div className="modal-overlay">
            <div className="modal">
                <h2>{editingGame ? 'Edit game' : 'Add game to list'}</h2>
                {gameData && (
                    <div className="game-card">
                        <h4>{gameData.name}</h4>
                        <img className="game-image" src={gameData.image_background} alt={gameData.name} />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select className='"category-input' id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="gamesToPlay">Games to play</option>
                        <option value="currentlyPlaying">Currently playing</option>
                        <option value="finishedGames">Finished games</option>
                        <option value="droppedGames">Dropped games</option>
                    </select>
                </div>
                <div className='edit-window'>
                    <button className='btn' onClick={handleAddClick}>{editingGame ? 'Save' : 'Add'}</button>
                    <button className='btn btn-danger' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default Modal;