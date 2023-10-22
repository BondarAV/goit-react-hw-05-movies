import { useEffect, useState } from 'react';

import { trendingMovies } from 'api';
import { Link } from 'react-router-dom';

export const Home = ({ setCurrentMovie }) => {
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

      <ul>
        {trending.map(movie => {
          return (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                onClick={() => setCurrentMovie(movie.id)}
                state={{ from: '/' }}
              >
                {movie.title !== undefined ? movie.title : movie.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
