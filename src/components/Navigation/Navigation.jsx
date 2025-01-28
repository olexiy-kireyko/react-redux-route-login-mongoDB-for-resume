import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import s from './Navigation.module.css';
import clsx from 'clsx';

const linkClass = ({ isActive }) => {
  return clsx(s.navigation_link, isActive && s.navigation_link_active);
};

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <nav className={s.navigation}>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/contacts" className={linkClass}>
            Contacts
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default Navigation;
