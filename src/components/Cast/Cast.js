import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { getMovieCreditsById } from 'services/api-service';

const Cast = () => {
  const [cast, setCast] = useState([]);
  let { movieId } = useParams();

  useEffect(() => {
    getMovieCreditsById(movieId, '/credits')
      .then(cast => {
        setCast(cast);
      })
      .catch(err => {
        toast.error(err.message);
      });
  }, [movieId]);

  return (
    <div>
      {cast.length ? (
        <ul>
          {cast.map(({ credit_id, name, path, character }) => (
            <li key={credit_id}>
              <img src={path} alt="poster" />
              <p>{name}</p>
              <span>
                <p>Character:</p>
                {character}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Actors not found</p>
      )}
    </div>
  );
};

export default Cast;
