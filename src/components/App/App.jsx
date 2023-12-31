import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import AboutProjectPage from '../AboutProjectPage/AboutProjectPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProfilePage from '../ProfilePage/ProfilePage';
import SignupPage from '../auth/SignupPage/SignupPage';
import SigninPage from '../auth/SigninPage/SigninPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: 'Виталий', email: 'pochta@yandex.ru' });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>

        <Route path='/' element={<Main />} >
          <Route path='/' element={<AboutProjectPage />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>

        <Route exact path='/signup' element={<SignupPage />} />
        <Route exact path='/signin' element={<SigninPage />} />

        <Route exact path='*' element={<NotFoundPage />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}
