import { Link } from 'react-router-dom';
import { List, Item, Img, Title } from 'components/MovieList/MovieListstyled';
import { useLocation } from 'react-router-dom';
import NoPoster from 'images/NoPoster.jpg';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <>
      <List>
        {movies.map(({ id, poster_path, title }) => {
          const poster = poster_path
            ? 'https://image.tmdb.org/t/p/w500/' + poster_path
            : NoPoster;
          return (
            <Item key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                <Img src={poster} alt={title} />
                <Title>{title}</Title>
              </Link>
            </Item>
          );
        })}
      </List>
    </>
  );
};

export default MovieList;
