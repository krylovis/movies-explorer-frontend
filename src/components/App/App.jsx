import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

export default function App() {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const handleOpenMenu = () => {
    setMenuIsOpen(true);
    console.log('menuIsOpen', menuIsOpen);
  };
  const handleCloseMenu = () => {
    setMenuIsOpen(false);
    console.log('menuIsOpen', menuIsOpen);
  };
  const pathsForHeader = ["/", "/movies", "/saved-movies", "/profile"];

  return (
    <>
      <Routes>
        {pathsForHeader.map((path) => <Route key={path} path={path} element={
          <Header handleOpenMenu={handleOpenMenu} handleCloseMenu={handleCloseMenu} />
        } />)}
      </Routes>

      {menuIsOpen && <Navigation handleCloseMenu={handleCloseMenu} />}
    </>
  );
}
