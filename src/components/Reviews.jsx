import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovieReviews } from 'api';

export const Reviews = () => {
  const [reviews, setReviews] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();

  const movieId = location.pathname.split('/')[2];

  useEffect(() => {
    getMovieReviews(movieId)
      .then(response => {
        setReviews(response.data.results);

        setIsLoaded(true);
      })
      .catch(error => {
        alert(error);

        setIsLoaded(false);
      });
  }, [movieId]);

  return isLoaded ? (
    <div>
      {reviews.length === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>

              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};
