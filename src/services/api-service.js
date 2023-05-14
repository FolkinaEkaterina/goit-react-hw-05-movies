import axios from 'axios';

const API_KEY = 'a2131ad5d6a3f97436f48b66c08b88ca';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMG_PLACEHOLDER = 'https://critics.io/img/movies/poster-placeholder.png';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

export const getTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getSearchMovies = async query => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`;
  const result = await axios.get(url);
  return result.data.results;
};

export const getMovieById = async id => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const { data } = await axios.get(url);
  const result = fixMovie(data);
  result.genres = result.genres.map(genre => genre.name);
  return result;
};

export const getMovieCreditsById = async id => {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
  const {
    data: { cast },
  } = await axios.get(url);
  return cast.map(fixCast);
};

export const getMovieReviewsById = async id => {
  const url = `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`;
  const {
    data: { results },
  } = await axios.get(url);
  const reviews = results.map(({ author, content }) => {
    return { author, content };
  });
  return reviews;
};

const fixMovie = movie => {
  let result = Object.assign({}, movie);
  if (result.poster_path)
    result.poster_path = IMG_BASE_URL + result.poster_path;
  else result.poster_path = IMG_PLACEHOLDER;
  result.release_year = !result.release_date
    ? 'Unknown'
    : result.release_date.slice(0, 4);
  result.vote_average = `${result.vote_average * 10}%`;
  return result;
};

const fixCast = ({ credit_id, name, profile_path, character }) => {
  const newActor = { credit_id, name, character };
  newActor.path = profile_path ? IMG_BASE_URL + profile_path : IMG_PLACEHOLDER;
  return newActor;
};
