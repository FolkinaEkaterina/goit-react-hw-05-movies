import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import Navigation from 'components/Navigation/Navigation';

const HomePage = lazy(() => import('components/Home/Home'));
const MoviesPage = lazy(() => import('components/Movies/Movies'));
const MovieDetailsPage = lazy(() =>
  import('components/MovieDetails/MovieDetails')
);
const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));

export default function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/movies"
          element={
            <Suspense fallback={<Loader />}>
              <MoviesPage />
            </Suspense>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={<Loader />}>
              <MovieDetailsPage />
            </Suspense>
          }
        >
          <Route
            path="cast"
            element={
              <Suspense fallback={<>...</>}>
                <Cast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<>...</>}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}
