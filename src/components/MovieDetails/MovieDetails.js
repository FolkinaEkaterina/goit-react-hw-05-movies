import React, { useState, useEffect } from 'react';
import { getMovieById } from 'services/api-service';
import {
  useParams,
  Outlet,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import toast from 'react-hot-toast';
import { MovieInfo, Img, Wrapper, Title, Caption } from './MovieDetails.styled';

export default function MovieDetails() {
  const [movieInfo, setMovieInfo] = useState({});
  let { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getMovieById(movieId)
      .then(setMovieInfo)
      .catch(err => {
        toast.error(err.message);
      });
  }, [movieId]);

  const onGoBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  return (
    <>
      <button onClick={onGoBack}> Go back</button>
      <MovieInfo>
        <div>
          <Img src={movieInfo.poster_path} alt="poster" />
        </div>
        <Wrapper>
          <Title>
            {movieInfo.title}({movieInfo.release_year})
          </Title>
          <p>Vote Average: {`User Score: ${movieInfo.vote_average}`}</p>
          <Caption>Overview</Caption>
          <p>{movieInfo.overview}</p>
          <Caption>Genres</Caption>
          <p>{[movieInfo.genres].join(' ')}</p>
        </Wrapper>
      </MovieInfo>
      <div>
        <hr />
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`} state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
        <hr />
      </div>
      <Outlet context={movieId} />
    </>
  );
}
