import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import './output.css';
import LoginPage from './views/LoginPage/LoginPage';
import HomePage from './views/home/HomePage';
import { homePreload } from './views/home/HomePage.preload';
import routeGuard from './helpers/routeGuard';
import FavoritesPage from './views/Favorites/Favorites';
import Footer from './components/Footer/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element:  <LoginPage/>
  },
  {
    path: '/home',
    element: <HomePage/>,
    loader: routeGuard(homePreload),
  },
  {
    path: '/favorites',
    element: <FavoritesPage/>,
    loader: routeGuard()
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <RouterProvider router={router}/>
      <Footer/>
    </>
  </React.StrictMode>,
);