import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';


import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import AboutProjectPage from '../AboutProjectPage/AboutProjectPage';
import Movies from '../Movies/Movies';
import ProfilePage from '../ProfilePage/ProfilePage';
import Footer from '../Footer/Footer';

export default function Main(props) {
  const { loggedIn, setCurrentUser, onUpdateUser, handleSetLoggedOut } = props;

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const handleOpenMenu = () => setMenuIsOpen(true);
  const handleCloseMenu = () => setMenuIsOpen(false);

  const { pathname } = useLocation();
  const isProfilePage = pathname === '/profile';

  return (
    <>
      <Header loggedIn={loggedIn} handleOpenMenu={handleOpenMenu} handleCloseMenu={handleCloseMenu} />

      <Routes>
        <Route exact path='/' element={<AboutProjectPage />} />

        <Route path="/movies" element={
          <ProtectedRoute loggedIn={loggedIn} element={() => (<Movies />)} />
        } />

        <Route path="/saved-movies" element={
          <ProtectedRoute loggedIn={loggedIn} element={() => (<Movies isSavedMovies={true} />)} />
        } />

        <Route path="/profile" element={
          <ProtectedRoute loggedIn={loggedIn} element={() => (
            <ProfilePage
              handleSetLoggedOut={handleSetLoggedOut}
              setCurrentUser={setCurrentUser}
              onUpdateUser={onUpdateUser}
            />
          )} />
        } />
      </Routes>

      {!isProfilePage && <Footer />}
      <Navigation menuIsOpen={menuIsOpen} handleCloseMenu={handleCloseMenu} />
    </>
  )
}