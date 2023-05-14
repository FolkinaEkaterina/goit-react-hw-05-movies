import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from 'components/App.styled';
import toast from 'react-hot-toast';
import Form from 'components/Form/Form';
import MovieList from 'components/MovieList/MovieList';
import Loader from 'components/Loader/Loader';
import { getSearchMovies } from 'services/api-service';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovies, setSearchMovies] = useSearchParams();

  useEffect(() => {
    const query = searchMovies.get('query');

    if (!query) return;
    setIsLoading(true);
    getSearchMovies(query)
      .then(movies => {
        setMovies(movies);
      })
      .catch(err => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchMovies]);

  const onSubmit = query => {
    setSearchMovies({ query });
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <Form onSubmit={onSubmit} />
      <MovieList movies={movies} />
    </Container>
  );
};

export default Movies;
