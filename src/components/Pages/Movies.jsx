import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from 'api';
import { MovieList } from '../MovieList';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) return;

    searchMovies(query)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        alert(error);
      });
  }, [searchParams]);

  const handleQuery = event => {
    event.preventDefault();

    if (event.target[0].value.trim() !== '') {
      setSearchParams({ query: event.target[0].value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <form onSubmit={handleQuery}>
        <input
          type="text"
          style={{ marginRight: 30, marginBottom: 30, width: 300, height: 30 }}
        />

        <button type="submit" style={{ width: 100, height: 30 }}>
          Search
        </button>
      </form>

      <MovieList
        movies={movies}
        state={'/movies?query='}
        query={searchParams.get('query')}
      />
    </div>
  );
};
