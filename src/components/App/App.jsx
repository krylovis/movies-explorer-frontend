import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { tokenVerification } from '../../utils/Auth';
import { mainApi } from '../../utils/MainApi';

import Main from '../Main/Main';
import SignupPage from '../auth/SignupPage/SignupPage';
import SigninPage from '../auth/SigninPage/SigninPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [requestMessage, setRequestMessage] = React.useState({ message: '', type: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleSetLoggedIn = () => setLoggedIn(true);
  const handleSetLoggedOut = () => setLoggedIn(false);

  function handleSetRequestMessage(message) {
    const isError = message.toLowerCase().includes('ошибка');

    if (isError) {
      console.error(message);
      setRequestMessage({ message, type: 'error' });
    } else {
      setRequestMessage({ message, type: 'success' });
    }
    setTimeout(() => setRequestMessage({ message: '', type: '' }), 3000);
  };

  function onUpdateUser(userInfo) {
    mainApi
      .editUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        handleSetRequestMessage('Профиль обнавлён');
      })
      .catch(handleSetRequestMessage);
  };

  function handleTokenCheck() {
    tokenVerification()
      .then((data) => {
        if (data._id) {
          setCurrentUser(data);
          setLoggedIn(true);
          const isAuthPath = pathname === '/signup' || pathname === '/signin';
          isAuthPath ? navigate('/movies') : navigate(pathname);
        } else {
          setLoggedIn(false);
          setCurrentUser({});
          navigate('/signin');
        }
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>

        <Route exact path='/*' element={<Main
          loggedIn={loggedIn}
          setRequestMessage={setRequestMessage}
          requestMessage={requestMessage}
          setCurrentUser={setCurrentUser}
          onUpdateUser={onUpdateUser}
          handleSetLoggedOut={handleSetLoggedOut}
        />} />

        <Route exact path='/signup' element={<SignupPage handleSetLoggedIn={handleSetLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route exact path='/signin' element={<SigninPage handleSetLoggedIn={handleSetLoggedIn} setCurrentUser={setCurrentUser} />} />

        <Route exact path='*' element={<NotFoundPage />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}
