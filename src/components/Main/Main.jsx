import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

export default function Main() {

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const handleOpenMenu = () => setMenuIsOpen(true);
  const handleCloseMenu = () => setMenuIsOpen(false);

  return (
    <section className="main">
      <Header handleOpenMenu={handleOpenMenu} handleCloseMenu={handleCloseMenu} />
      <Outlet />
      <Navigation menuIsOpen={menuIsOpen} handleCloseMenu={handleCloseMenu} />
    </section>
  )
}