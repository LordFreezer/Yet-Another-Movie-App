import { useState, useEffect } from 'react';
import '../styles/App.css';
import SearchIcon from '../assets/search.svg';
import Movie from './Movie';


const baseUrl = 'https://www.omdbapi.com/?apikey={KEY_GOES_HERE}';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    searchMovies('Naruto')
  }, [])

  const searchMovies = async (title) => {
    const response = await fetch(`${baseUrl}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    console.log(data.Search);
  }


  return (
    <div className="app">
      <marquee><h1>Flicks of The Derflinger</h1></marquee>

      <div className="search">


        <input placeholder="Search..."
          value={search} onChange={(e) => setSearch(e.target.value)} />

        <img src={SearchIcon} alt="?"
          onClick={() => searchMovies(search)} />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {
                movies.map((movie) => (
                  <Movie movie={movie} key={movie.imdbID} />
                ))
              }
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )
      }
    </div >
  );
}

export default App;
