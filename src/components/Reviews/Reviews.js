import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { getMovieReviewsById } from 'services/api-service';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  let { movieId } = useParams();

  useEffect(() => {
    getMovieReviewsById(movieId)
      .then(reviews => {
        setReviews(reviews);
      })
      .catch(err => {
        toast.error(err.message);
      });
  }, [movieId]);

  return (
    <div>
      {reviews.length ? (
        <ul>
          {reviews.map(({ author, content }) => (
            <li key={author}>
              <span>
                <p>Author:</p>
                {author}
              </span>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
};
export default Reviews;
