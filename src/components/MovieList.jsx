import { Link } from 'react-router-dom';

export const MovieList = ({ movies, state, query = '' }) => {
  return (
    <ul>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: `${state}${query}` }}
            >
              {movie.title !== undefined ? movie.title : movie.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
