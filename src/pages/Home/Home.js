import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Container, HomeTitle } from 'components/App.styled';
import Loader from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';
import { getTrendingMovies } from 'services/api-service';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTrendingMovies()
      .then(data => {
        setMovies(data.results);
      })
      .catch(err => {
        toast.error(err.message);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      {isLoading && <Loader />}
      <HomeTitle>Trending today</HomeTitle>
      <MovieList movies={movies} />
    </Container>
  );
};

export default Home;
