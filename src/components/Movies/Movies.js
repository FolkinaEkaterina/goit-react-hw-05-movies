import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getSearchMovies } from 'services/api-service';

export default function Movies() {
  const [searchMovies, setSearchMovies] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const search = useLocation().search;
  const query = new URLSearchParams(search).get('query');

  const handleQueryChange = e => {
    const value = e.target.value.toLowerCase();
    setSearchMovies(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchMovies.trim() === '') {
      toast.error(`Please enter query`);
      return;
    }
    getSearchMovies(searchMovies)
      .then(movies => {
        setMovies(movies);
        navigate(`/movies?query=${searchMovies}`);
      })
      .catch(err => {
        toast.error(err.message);
      });
    setSearchMovies('');
  };

  useEffect(() => {
    if (searchMovies || searchMovies === query) {
      return;
    }
    if (!query) {
      return;
    }
    getSearchMovies(query)
      .then(movies => {
        setMovies(movies);
      })
      .catch(err => {
        toast.error(err.message);
      });
    setSearchMovies('');
  }, [query, searchMovies]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <FiSearch />
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={searchMovies}
          onChange={handleQueryChange}
        />
      </form>
      {movies?.length > 0 && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
