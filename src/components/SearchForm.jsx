import logo from '../images/Logo1.png'
import SignOutButton from './SignOutButton';
import "../styles/styles.css"

// SearchForm component
export default function SearchForm({ isSearching, handleInputChange, handleKeyPress, fetchRandomGames, handleViewListClick, handleSearchClick, setUser, setIsAuthenticated }) {
    return (
         // Render a form that contains a logo, a title or search input, and a set of buttons
        // The set of buttons changes based on whether the user is currently searching for games
        <form className="new-form sticky">
            <div className="form-row">
                <div className="title-container">
                    <img className='logo' src={logo} alt="Logo" />
                </div>
                <div className="page-title">
                    {isSearching ? (
                        <div className="input-container">
                            <input type="text" id="item" placeholder="Search for games" onChange={handleInputChange} onKeyDown={handleKeyPress} />
                        </div>
                    ) : (
                        <h1>View and edit your video game list below</h1>
                    )}
                </div>
                <div className="title-container">
                    {isSearching ? (
                        <>
                            <div className='new-btn-container'>
                                <button className="btn btn-form" onClick={(event) => fetchRandomGames(event)}>All Games</button>
                                <button className="btn btn-form center" onClick={handleViewListClick}>View My List</button>
                                <SignOutButton setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='new-btn-container'>
                                <button className="btn btn-form cneter" onClick={handleSearchClick}>Search Game</button>
                                <SignOutButton setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
