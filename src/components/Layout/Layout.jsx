import { Suspense } from 'react';
import AppBar from '../AppBar/AppBar';
import s from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={s.layout}>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
