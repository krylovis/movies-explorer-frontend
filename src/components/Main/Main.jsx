import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';


import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import AboutProjectPage from '../AboutProjectPage/AboutProjectPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProfilePage from '../ProfilePage/ProfilePage';
import Footer from '../Footer/Footer';

export default function Main(props) {
  const { loggedIn, setCurrentUser, getAndSetMovies, onUpdateUser, handleSetLoggedOut } = props;

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
        <Route exact path='/movies' element={<Movies getAndSetMovies={getAndSetMovies} />} />
        <Route exact path='/saved-movies' element={<SavedMovies />} />
        <Route exact path='/profile' element={<ProfilePage
          handleSetLoggedOut={handleSetLoggedOut}
          setCurrentUser={setCurrentUser}
          onUpdateUser={onUpdateUser}
        />} />
      </Routes>

      {!isProfilePage && <Footer />}
      <Navigation menuIsOpen={menuIsOpen} handleCloseMenu={handleCloseMenu} />
    </>
  )
}