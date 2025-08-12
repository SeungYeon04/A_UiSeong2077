// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Game from './pages/game';
import Home from './pages/home';
import AuthCheck from './components/AuthCheck';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/home"
          element={
            <AuthCheck>
              <Home />
            </AuthCheck>
          }
        />
        <Route
          path="/game"
          element={
            <AuthCheck>
              <Game />
            </AuthCheck>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
