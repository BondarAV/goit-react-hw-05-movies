import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import { Header } from './Header';

const Home = lazy(() =>
  import('./Pages/Home').then(module => ({
    default: module.Home,
  }))
);

const MovieDetails = lazy(() =>
  import('./Pages/MovieDetails').then(module => ({
    default: module.MovieDetails,
  }))
);

const Movies = lazy(() =>
  import('./Pages/Movies').then(module => ({
    default: module.Movies,
  }))
);

const Cast = lazy(() =>
  import('./Cast').then(module => ({
    default: module.Cast,
  }))
);

const Reviews = lazy(() =>
  import('./Reviews').then(module => ({
    default: module.Reviews,
  }))
);

export const App = () => {
  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />

          <Route path="/movies/:movieId/*" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
