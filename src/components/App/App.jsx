import React from 'react';
import { Route, Routes, } from 'react-router-dom';

import { pathsForHeader } from '../../utils/constants';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SignupPage from '../auth/SignupPage/SignupPage';
import SigninPage from '../auth/SigninPage/SigninPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function App() {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const handleOpenMenu = () => setMenuIsOpen(true);
  const handleCloseMenu = () => setMenuIsOpen(false);

  return (
    <>
      <Routes>
        {pathsForHeader.map((path) => <Route key={path} path={path} element={
          <Header handleOpenMenu={handleOpenMenu} handleCloseMenu={handleCloseMenu} />
        } />)}

        <Route exact path='/signup' element={<SignupPage />} />
        <Route exact path='/signin' element={<SigninPage />} />

        <Route exact path='*' element={<NotFoundPage />} />
      </Routes>

      <Routes>
        <Route exact path='/profile' element={<ProfilePage />} />
      </Routes>

      <Navigation menuIsOpen={menuIsOpen} handleCloseMenu={handleCloseMenu} />
    </>
  );
}
