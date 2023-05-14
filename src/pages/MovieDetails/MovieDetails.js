import { useState, useEffect, Suspense } from 'react';
import { getMovieById } from 'services/api-service';
import {
  useParams,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Container } from 'components/App.styled';
import toast from 'react-hot-toast';
import {
  MovieInfo,
  Img,
  Wrapper,
  Title,
  Caption,
  BackBtn,
} from './MovieDetails.styled';

const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState({});
  let { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieById(movieId)
      .then(setMovieInfo)
      .catch(err => {
        toast.error(err.message);
      });
  }, [movieId]);

  const GoBackBtn = () => {
    navigate(location?.state?.from ?? '/');
  };

  return (
    <Container>
      <BackBtn onClick={GoBackBtn}> Go back</BackBtn>
      <MovieInfo>
        <div>
          <Img src={movieInfo.poster_path} alt="poster" />
        </div>
        <Wrapper>
          <Title>
            {movieInfo.title}({movieInfo.release_year})
          </Title>
          <Caption>Vote Average</Caption>
          <p>{`User Score: ${movieInfo.vote_average}`}</p>
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
      <Suspense>
        <Outlet context={movieId} />
      </Suspense>
    </Container>
  );
};

export default MovieDetails;
