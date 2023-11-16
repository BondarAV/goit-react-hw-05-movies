import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovieCredits } from 'api';

export const Cast = () => {
  const [cast, setCast] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();

  const movieId = location.pathname.split('/')[2];

  useEffect(() => {
    getMovieCredits(movieId)
      .then(response => {
        setCast(response.data.cast);
        setIsLoaded(true);
      })
      .catch(error => {
        alert(error);
        setIsLoaded(false);
      });
  }, [movieId]);

  return isLoaded === true ? (
    <div>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 75 }}>
        {cast.map(person => (
          <li key={person.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                person.profile_path || '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'
              }`}
              alt=""
              width={200}
            />

            <p>{person.name}</p>
            <p>Character: {person.character}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div></div>
  );
};
