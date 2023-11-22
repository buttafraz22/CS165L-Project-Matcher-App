import '../App.css';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import About from '../pages/About';
import Testmonials from '../pages/Testimonials';
import CreateProfile from '../pages/CreateProfile';
import React from "react";
import {BrowserRouter as Main, Routes, Route} from "react-router-dom";
import LoginState from '../context/authentication/LoginState';

function App() {
  return (
    <LoginState>
      <Main>
          <Routes>
              <Route exact path="/home/:userId" element={<Home />} />
              <Route exact path="/" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/profile/:username" element={<CreateProfile />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/testimonials" element={<Testmonials />} />
          </Routes>
      </Main>
    </LoginState>
  );
}

export default App;