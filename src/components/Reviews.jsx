import { useEffect, useState } from 'react';

import { getMovieReviews } from 'api';

export const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMovieReviews(id)
      .then(response => {
        setReviews(response.data.results);

        setIsLoaded(true);
      })
      .catch(error => {
        alert(error);

        setIsLoaded(false);
      });
  }, []);

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
