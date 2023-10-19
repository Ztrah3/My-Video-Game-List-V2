import React, { useState, useEffect } from 'react';
import "../styles/styles.css"

function Modal({ isOpen, onClose, selectedGame, editingGame, setEditingGame, gamesToPlay, setGamesToPlay, currentlyPlaying, setCurrentlyPlaying, finishedGames, setFinishedGames, droppedGames, setDroppedGames }) {
    const [selectedCategory, setSelectedCategory] = useState('gamesToPlay');
    const [selectedRating, setSelectedRating] = useState(1);
    const [gameData, setGameData] = useState(null);

    useEffect(() => {
        if (editingGame) {
            setSelectedCategory(editingGame.category);
            setGameData(editingGame); // Set the game data state when editing a game
        } else if (selectedGame) {
            setGameData(selectedGame); // Set the game data state when adding a new game
        }
    }, [editingGame, selectedGame]);

    if (!isOpen) return null;

    const handleAddClick = () => {
        const gameToAdd = {
            ...gameData,
            timestamp: editingGame ? editingGame.timestamp : Date.now(),
        };

        if (editingGame && editingGame.category !== selectedCategory) {
            // remove the game from its current list
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

        // add the game to its new list
        switch (selectedCategory) {
            case 'gamesToPlay':
                if (!gamesToPlay.some(game => game.name === gameToAdd.name)) {
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

        if (editingGame) {
            setEditingGame(null);
        }
        setSelectedCategory('gamesToPlay');
        onClose();
    };

    return (
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