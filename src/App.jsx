import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import "./styles/styles.css"
import Modal from './components/Modal';
import SearchForm from './components/SearchForm';
import GameList from './components/GameList';
import Pagination from './components/Pagination';
import GameListItem from './components/GameListItem';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Authentication from './components/Authentication';
import { db } from './components/AuthGoogle'; // Import Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';


export default function App() {
   //State variables 
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state variable for the search term
  const apiKey = '0d1c2b2db96a4892b93254d2f1cece8d'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null); // New state variable for the selected game
  const [gamesToPlay, setGamesToPlay] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [finishedGames, setFinishedGames] = useState([]);
  const [droppedGames, setDroppedGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [rating, setRating] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect hook to handle user authentication and fetching user's lists from Firestore
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in.
        setIsAuthenticated(true);

        // Fetch the user's lists from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setGamesToPlay(userData.gamesToPlay || []);
          setCurrentlyPlaying(userData.currentlyPlaying || []);
          setFinishedGames(userData.finishedGames || []);
          setDroppedGames(userData.droppedGames || []);
          setRating(userData.rating || {});
        } else {
          // If the document doesn't exist, initialize the lists as empty arrays
          await setDoc(userDocRef, {
            gamesToPlay: [],
            currentlyPlaying: [],
            finishedGames: [],
            droppedGames: [],
            rating: {}
          });
        }
      } else {
        // User is signed out.
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

   // Function to fetch games from the API
  const fetchGames = async (page) => {
    const perPage = 20;
    // Include the search term in the API request
    let slug = searchTerm.split(' ').join('-').toLowerCase()
    const url = `https://rawg-video-games-database.p.rapidapi.com/games?search=${slug}&per_page=${perPage}&page=${page}&key=${apiKey}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1c31eeecc3mshab5528f3b7973dep1a2011jsnf3452c300c40',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // Map results of API request
      let transformedData = result.results.map((game) => ({
        id: game.id,
        name: game.name,
        image_background: game.background_image
      }));
      // Call setGames function on APT request results
      setGames(transformedData);
    } catch (error) {
      console.error(error);
    }
  };
  // Function to fetch a random order of games from the API
  const fetchRandomGames = async (event) => {
    event.preventDefault();

    const perPage = 20;
    const url = `https://rawg-video-games-database.p.rapidapi.com/games?per_page=${perPage}&key=${apiKey}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1c31eeecc3mshab5528f3b7973dep1a2011jsnf3452c300c40',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      let transformedData = result.results.map((game) => ({
        id: game.id,
        name: game.name,
        image_background: game.background_image
      }));

      setGames(transformedData);
      setIsSearching(true);
    } catch (error) {
      console.error(error);
    }
  };
 // Function to handle the search button click
  const handleSearchClick = (event) => {
     //Prevent page from reloading on button click
    event.preventDefault();
    setIsSearching(true);
    setPage(1); 
    fetchGames(page);
  };

  // Function to handle the next button click in pagination
  const handleNextClick = (event) => {
    event.preventDefault();
    setTimeout(() => {
      setPage(page + 1);
    }, 1100);
    fetchGames(page + 1);
  };
  
  // Function to handle the previous button click in pagination
  const handlePreviousClick = (event) => {
    event.preventDefault();
    if (page > 1) {
      setTimeout(() => {
        setPage(page - 1);
      }, 1100);
      fetchGames(page - 1);
    }
  };
  
  // Function to handle the view list button click
  const handleViewListClick = (event) => {
    event.preventDefault();
    setIsSearching(false);
  };

  // New function to handle changes to the input field
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle the Enter key press in the search field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fetchGames(page);
    }
  };

  // Function to handle the game card click
  const handleGameClick = (game) => {
    setSelectedGame(game); // Set the selected game when a game card is clicked
    setIsModalOpen(true);
  };

  // Functions to remove a game from the respective lists
  const removeGameFromGamesToPlay = (timestamp) => {
    setGamesToPlay(gamesToPlay.filter(game => game.timestamp !== timestamp));
  };

  const removeGameFromCurrentlyPlaying = (timestamp) => {
    setCurrentlyPlaying(currentlyPlaying.filter(game => game.timestamp !== timestamp));
  };

  const removeGameFromFinishedGames = (timestamp) => {
    setFinishedGames(finishedGames.filter(game => game.timestamp !== timestamp));
  };

  const removeGameFromDroppedGames = (timestamp) => {
    setDroppedGames(droppedGames.filter(game => game.timestamp !== timestamp));
  };

  // Function to handle the edit button click
  const handleEditClick = (game, category) => {
    setEditingGame({ ...game, category });
    setIsModalOpen(true);
  };

  // Function to save the user's lists to Firestore when they change
  const saveListsToFirestore = async () => {
    if (isAuthenticated) {
      // Get firebase authentication object
      const auth = getAuth();
      // Get currently logged in user from auth object
      const user = auth.currentUser;
      if (user) {
         // Get currently logged in user from auth object
        const userDocRef = doc(db, 'users', user.uid);
        // Set data in the doc based on the userDocRef 
        await setDoc(userDocRef, {
          gamesToPlay,
          currentlyPlaying,
          finishedGames,
          droppedGames,
          rating
          // Tells Firestore to merge inputs with any existing doc
        }, { merge: true });
      }
    }
  };

  // useEffect hook to save the user's lists to Firestore when they change
  useEffect(() => {
    saveListsToFirestore();
  }, [gamesToPlay, currentlyPlaying, finishedGames, droppedGames, rating]);
  // Render components
  return (

    <Router>
      <Routes>
        <Route path="/Authentication" element={isAuthenticated ? <Navigate to="/app" /> : <Authentication />} />
        <Route path="/app" element={isAuthenticated ? (
          <div>
            <SearchForm
              isSearching={isSearching}
              handleInputChange={handleInputChange}
              handleKeyPress={handleKeyPress}
              fetchRandomGames={fetchRandomGames}
              handleViewListClick={handleViewListClick}
              handleSearchClick={handleSearchClick}
            />
            <Modal
              isOpen={isModalOpen}
              onClose={() => { setIsModalOpen(false); setEditingGame(null); }}
              selectedGame={selectedGame}
              editingGame={editingGame}
              setEditingGame={setEditingGame}
              gamesToPlay={gamesToPlay}
              setGamesToPlay={setGamesToPlay}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
              finishedGames={finishedGames}
              setFinishedGames={setFinishedGames}
              droppedGames={droppedGames}
              setDroppedGames={setDroppedGames}
              removeGameFromGamesToPlay={removeGameFromGamesToPlay}
              removeGameFromCurrentlyPlaying={removeGameFromCurrentlyPlaying}
              removeGameFromFinishedGames={removeGameFromFinishedGames}
              removeGameFromDroppedGames={removeGameFromDroppedGames}
            />
            {isSearching && (
              <>
                <GameList games={games} handleGameClick={handleGameClick} />
                <Pagination page={page} handlePreviousClick={handlePreviousClick} handleNextClick={handleNextClick} />
              </>
            )}
            {!isSearching && (
              <div className="list-container">
                <h2 className="games-title">Games To Play</h2>
                <ul className="plan-list">
                  {gamesToPlay.map((game) => (
                    <GameListItem
                      game={game}
                      category='gamesToPlay'
                      handleEditClick={handleEditClick}
                      removeGame={removeGameFromGamesToPlay}
                      rating={rating}
                      setRating={setRating}
                    />
                  ))}
                </ul>
                <h2 className="playing-title">Currently Playing</h2>
                <ul className="current-list">
                  {currentlyPlaying.map((game) => (
                    <GameListItem
                      game={game}
                      category='currentlyPlaying'
                      handleEditClick={handleEditClick}
                      removeGame={removeGameFromCurrentlyPlaying}
                      rating={rating}
                      setRating={setRating}
                    />
                  ))}
                </ul>
                <h2 className="finished-title">Finished Games</h2>
                <ul className="Finished-list">
                  {finishedGames.map((game) => (
                    <GameListItem
                      game={game}
                      category='finishedGames'
                      handleEditClick={handleEditClick}
                      removeGame={removeGameFromFinishedGames}
                      rating={rating}
                      setRating={setRating}
                    />
                  ))}
                </ul>
                <h2 className="dropped-title">Dropped Games</h2>
                <ul className="Drooped-list">
                  {droppedGames.map((game) => (
                    <GameListItem
                      game={game}
                      category='droppedGames'
                      handleEditClick={handleEditClick}
                      removeGame={removeGameFromDroppedGames}
                      rating={rating}
                      setRating={setRating}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : <Navigate to="/Authentication" />} />
        <Route path="*" element={<Navigate to="/Authentication" />} />
      </Routes>
    </Router>
  );
}