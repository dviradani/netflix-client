import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage';
import BrowsePage from './pages/BrowsePage';
import './App.scss'
import Footer from './components/Footer/Footer';
import InfoPage from './pages/InfoPage';
import PlayerPage from './pages/PlayerPage';
import SearchPage from './pages/SearchPage';
import Header from './components/Header/Header';

function App() {

  return (
    <>
    <BrowserRouter>
        <ToastContainer position="bottom-center" limit={1}/>
          <Header/>
        <main className='my-main-app-container'>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage/>} />
          <Route path="/browse" element={<BrowsePage type={" "}/>} />
          <Route path="/movies" element={<BrowsePage type={"movies"}/>} />
          <Route path="/tvshows" element={<BrowsePage type={"tvshows"}/>} />
          <Route path="/info/:id" element={<InfoPage/>} />
          <Route path="/play/:id" element={<PlayerPage/>} />
          <Route path="/search" element={<SearchPage/>} />
        </Routes>
        </main>
        <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
