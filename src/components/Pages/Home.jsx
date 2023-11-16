import { useEffect, useState } from 'react';
import { trendingMovies } from 'api';

import { MovieList } from '../MovieList';

export const Home = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    trendingMovies()
      .then(response => {
        setTrending(response.data.results);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <h2>Trending today</h2>

      <MovieList movies={trending} state={'/'} />
    </div>
  );
};
