import { Outlet, Link } from 'react-router-dom';
import { Suspense } from 'react';

export const Header = () => {
  return (
    <div>
      <nav
        style={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: 25,
          fontSize: 20,
          color: '#010101',
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/movies" state={{ from: '/' }}>
          Movies
        </Link>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
