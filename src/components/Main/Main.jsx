import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { mainApi } from '../../utils/MainApi';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import AboutProjectPage from '../AboutProjectPage/AboutProjectPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProfilePage from '../ProfilePage/ProfilePage';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function Main(props) {
  const { loggedIn, requestMessage, setRequestMessage, setCurrentUser, onUpdateUser, handleSetLoggedOut } = props;

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const [isError, setIsError] = React.useState(false);

  const handleOpenMenu = () => setMenuIsOpen(true);
  const handleCloseMenu = () => setMenuIsOpen(false);

  const { pathname } = useLocation();
  const isProfilePage = pathname === '/profile';
  const routeName = ['/', '/movies', '/saved-movies', '/profile'];
  const isNotFoundPage = routeName.includes(pathname);

  const setErrors = (error) => {
    console.error(error);
    setIsError(true);
  };

  const getSavedMoviesAsync = () => {
    mainApi.getMovies()
      .then(movies => {
        setSavedMoviesList(movies);
      })
      .catch(setErrors);
  };

  const toggleCardLike = (card, isDelete = false) => {
    console.log(card);
    if (!isDelete) {
      mainApi.saveMovie(card)
        .then((newCard) => {
          setSavedMoviesList((list) => [newCard, ...list]);
        })
        .catch(console.error);
    } else {
      mainApi.deleteMovie(card._id)
        .then((newCard) => {
          setSavedMoviesList((list) => list.filter((oldCard) => oldCard._id !== newCard._id));
        })
        .catch(console.error);
    }
  };

  React.useEffect(() => {
    getSavedMoviesAsync();
  }, []);

  return (
    <>
      {isNotFoundPage && <Header loggedIn={loggedIn} handleOpenMenu={handleOpenMenu} handleCloseMenu={handleCloseMenu} />}

      <Routes>
        <Route exact path='/' element={<AboutProjectPage />} />
        <Route exact path='*' element={<NotFoundPage />} />

        <Route path="/movies" element={
          <ProtectedRoute loggedIn={loggedIn} element={() => (
            <Movies
              savedMoviesList={savedMoviesList}
              toggleCardLike={toggleCardLike}
            />)} />
        } />

        <Route path="/saved-movies" element={
          <ProtectedRoute loggedIn={loggedIn} element={() => (
            <SavedMovies
              savedMoviesList={savedMoviesList}
              toggleCardLike={toggleCardLike}
            />)} />
        } />

        <Route path="/profile" element={
          <ProtectedRoute loggedIn={loggedIn} element={() => (
            <ProfilePage
              requestMessage={requestMessage}
              setRequestMessage={setRequestMessage}
              handleSetLoggedOut={handleSetLoggedOut}
              setCurrentUser={setCurrentUser}
              onUpdateUser={onUpdateUser}
            />
          )} />
        } />
      </Routes>

      {(!isProfilePage && isNotFoundPage) && <Footer />}
      <Navigation menuIsOpen={menuIsOpen} handleCloseMenu={handleCloseMenu} />
    </>
  )
}