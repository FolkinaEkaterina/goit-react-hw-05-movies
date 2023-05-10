import React, { useState, useEffect } from 'react';
import { List, Item, Img, Title } from './Home.styled';
import { Link } from 'react-router-dom';

import { getTrendingMovies } from 'services/api-service';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await getTrendingMovies();
      setMovies(results);
    };
    getMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {movies.length > 0 && (
        <List>
          {movies.map(({ id, poster_path, title }) => {
            return (
              <Item key={id}>
                <Link to={`/movies/${id}`}>
                  <Img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                  />
                  <Title>{title}</Title>
                </Link>
              </Item>
            );
          })}
        </List>
      )}
    </div>
  );
}
