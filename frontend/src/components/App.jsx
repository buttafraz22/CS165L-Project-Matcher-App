import '../App.css';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import About from '../pages/About';
import Testmonials from '../pages/Testimonials';
import CreateProfile from '../pages/CreateProfile';
import React from "react";
import {BrowserRouter as Main, Routes, Route} from "react-router-dom";
import LoginState from '../context/auth/LoginState';
import MessagesState from '../context/user-messages/MessagesState';
import Protected from './Protected';
import Chat from '../pages/Chat';
import Navbar from './Navbar';

function App() {
  return (
    <>
    <LoginState>
      <MessagesState>
        <Main>
          <Navbar />
          <Routes>
            <Route exact path="/home" element={<Protected Component={Home} />} />
            <Route exact path="/profile/:username" element={<Protected Component={CreateProfile} />} />
            <Route exact path="/chat" element={<Protected Component={Chat} />} />
            {/* <Route exact path="/chat" element={<Chat/>} /> */}
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/testimonials" element={<Testmonials />} />
          </Routes>
        </Main>
      </MessagesState>
    </LoginState>
    </>
  );
}

export default App;