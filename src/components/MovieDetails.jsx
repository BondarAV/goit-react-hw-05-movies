import { Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getMovieById } from 'api';

const Cast = lazy(() =>
  import('./Cast').then(module => ({
    default: module.Cast,
  }))
);
const Reviews = lazy(() =>
  import('./Reviews').then(module => ({
    default: module.Reviews,
  }))
);

export const MovieDetails = ({ currentMovieId }) => {
  const [currentMovie, setCurrentMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    let movieId = currentMovieId;

    if (currentMovieId === undefined) {
      movieId = location.pathname.split('/')[2];
    }

    getMovieById(movieId)
      .then(response => {
        setCurrentMovie(response.data);

        setIsLoaded(true);
      })
      .catch(error => {
        alert(error);

        setIsLoaded(false);
      });
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(location.state.from);
  };

  return isLoaded ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <button onClick={goBack} style={{ width: 100, height: 30 }}>
        Go back
      </button>

      <div
        style={{
          display: 'flex',
          gap: 30,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
          alt=""
          width={250}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2>
            {currentMovie.title !== undefined
              ? currentMovie.title
              : currentMovie.name}
          </h2>

          <p>User score: {`${Math.floor(currentMovie.vote_average * 10)}%`}</p>

          <h3>Overview</h3>

          <p>{currentMovie.overview}</p>

          <h4>Genres</h4>

          <p>
            {currentMovie.genres !== undefined
              ? currentMovie.genres.map(genre => genre.name).join(' ')
              : ''}
          </p>
        </div>
      </div>

      <p>Additional information</p>

      <ul>
        <li>
          <Link to={`cast`} state={location.state}>
            Cast
          </Link>
        </li>
        <li>
          <Link to={`reviews`} state={location.state}>
            Reviews
          </Link>
        </li>
      </ul>

      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route path="cast" element={<Cast id={currentMovie.id} />} />
          <Route path="reviews" element={<Reviews id={currentMovie.id} />} />
        </Routes>
      </Suspense>
    </div>
  ) : (
    <p>Loading...</p>
  );
};
