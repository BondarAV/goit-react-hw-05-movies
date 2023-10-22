import { useState, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  useSearchParams,
  Link,
} from 'react-router-dom';

import { searchMovies } from 'api';

export const Movies = ({ setCurrentMovie }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  useEffect(() => {
    searchMovies(query)
      .then(response => {
        setMovies(response.data.results);

        if (query.trim() !== '') {
          setSearchParams({ query: query });
        } else {
          setSearchParams({});
        }
      })
      .catch(error => {
        alert(error);
      });
  }, [query]);

  const handleQuery = event => {
    event.preventDefault();

    setQuery(event.target[0].value);
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(location.state.from);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button onClick={goBack} style={{ width: 100, height: 30 }}>
        Go back
      </button>

      <form onSubmit={handleQuery}>
        <input
          type="text"
          style={{ marginRight: 30, marginBottom: 30, width: 300, height: 30 }}
        />

        <button type="submit" style={{ width: 100, height: 30 }}>
          Search
        </button>

        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link
                  to={`/movies/${movie.id}`}
                  onClick={() => setCurrentMovie(movie.id)}
                  state={{ from: `/movies?query=${query}` }}
                >
                  {movie.title !== undefined ? movie.title : movie.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
};
