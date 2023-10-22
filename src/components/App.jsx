import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import { Header } from './Header';
import { Home } from './Home';
import { MovieDetails } from './MovieDetails';
import { Movies } from './Movies';

export const App = () => {
  const [currentMovieId, setCurrentMovieId] = useState();

  const setCurrentMovie = id => {
    setCurrentMovieId(id);
  };

  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Header>
        <nav
          style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: 25,
            fontSize: 20,
            color: '#010101',
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/movies" state={{ from: '/' }}>
            Movies
          </Link>
        </nav>
      </Header>

      <Routes>
        <Route path="/" element={<Home setCurrentMovie={setCurrentMovie} />} />
        <Route
          path="/movies"
          element={<Movies setCurrentMovie={setCurrentMovie} />}
        />

        <Route
          path="/movies/:movieId/*"
          element={<MovieDetails currentMovieId={currentMovieId} />}
        ></Route>
      </Routes>
    </div>
  );
};
