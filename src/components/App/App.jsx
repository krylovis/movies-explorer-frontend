import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';


export default function App() {
  const pathsForHeader = ["/", "/movies", "/saved-movies", "/profile"];

  return (
    <Routes>
      {pathsForHeader.map((path) => <Route key={path} path={path} element={<Header />} />)}
    </Routes>
  );
}
