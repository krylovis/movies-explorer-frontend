import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';


import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

export default function Main() {

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const handleOpenMenu = () => setMenuIsOpen(true);
  const handleCloseMenu = () => setMenuIsOpen(false);

  const { pathname } = useLocation();
  const isProfilePage = pathname === '/profile';

  return (
    <>
      <Header handleOpenMenu={handleOpenMenu} handleCloseMenu={handleCloseMenu} />
      <Outlet />
      {!isProfilePage && <Footer />}
      <Navigation menuIsOpen={menuIsOpen} handleCloseMenu={handleCloseMenu} />
    </>
  )
}