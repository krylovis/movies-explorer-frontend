import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { tokenVerification } from '../../utils/Auth';
import { mainApi } from '../../utils/MainApi';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import SignupPage from '../auth/SignupPage/SignupPage';
import SigninPage from '../auth/SigninPage/SigninPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleSetLoggedIn = () => setLoggedIn(true);
  const handleSetLoggedOut = () => setLoggedIn(false);

  function onUpdateUser(userInfo) {
    mainApi
      .editUserInfo(userInfo)
      .then(setCurrentUser)
      .catch(console.error);
  };

  React.useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTokenCheck() {
    tokenVerification()
      .then((data) => {
        if (data._id) {
          setCurrentUser(data);
          setLoggedIn(true);
          navigate('/');
        } else {
          setLoggedIn(false);
          setCurrentUser({});
          navigate('/signin');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>

        <Route exact path='/*' element={<Main
          loggedIn={loggedIn}
          setCurrentUser={setCurrentUser}
          onUpdateUser={onUpdateUser}
          handleSetLoggedOut={handleSetLoggedOut}
        />} />

        <Route exact path='/signup' element={<SignupPage />} />
        <Route exact path='/signin' element={<SigninPage handleSetLoggedIn={handleSetLoggedIn} setCurrentUser={setCurrentUser} />} />

        <Route exact path='*' element={<NotFoundPage />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}
