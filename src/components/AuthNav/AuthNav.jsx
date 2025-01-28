import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';
import clsx from 'clsx';

const linkClass = ({ isActive }) => {
  return clsx(s.auth_nav_link, isActive && s.auth_nav_link_active);
};

const AuthNav = () => {
  return (
    <div className={s.auth_nav}>
      <NavLink to="/register" className={linkClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={linkClass}>
        Log in
      </NavLink>
    </div>
  );
};

export default AuthNav;
