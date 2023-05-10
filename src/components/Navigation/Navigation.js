import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <>
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive
            ? {
                color: '#a52a2a',
                textDecoration: 'none',
                padding: '12px',
                fontWeight: '500',
                fontSize: '18px',
              }
            : {
                color: '#000000',
                padding: '12px',
                fontWeight: '500',
                fontSize: '18px',
              }
        }
      >
        Home
      </NavLink>
      <span> </span>
      <NavLink
        to="/movies"
        style={({ isActive }) =>
          isActive
            ? {
                color: '#a52a2a',
                textDecoration: 'none',
                padding: '12px',
                fontWeight: '500',
                fontSize: '18px',
              }
            : {
                color: '#000000',
                padding: '12px',
                fontWeight: '500',
                fontSize: '18px',
              }
        }
      >
        Movies
      </NavLink>
    </nav>
    <hr />
  </>
);

export default Navigation;
