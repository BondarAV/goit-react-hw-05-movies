import { useEffect, useState } from 'react';

import { getMovieCredits } from 'api';

export const Cast = ({ id }) => {
  const [cast, setCast] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMovieCredits(id)
      .then(response => {
        setCast(response.data.cast);

        setIsLoaded(true);
      })
      .catch(error => {
        alert(error);

        setIsLoaded(false);
      });
  });

  return isLoaded ? (
    <div>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 75 }}>
        {cast.map(person => (
          <li key={person.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
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
    <p>Loading...</p>
  );
};
