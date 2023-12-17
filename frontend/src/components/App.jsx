/*
  Main Application File

  Orchestrates the structure and routing of the React application.
  Manages authentication with the LoginState context provider.
  Handles user messages using the MessagesState context provider.

  Components:
  - Navbar: Navigation bar.
  - Protected: Custom component for secure, authenticated routes.

  Pages:
  - Home, CreateProfile, Chat, MyProfile, Login, SignUp, About, Testimonials.

  React Router:
  - Utilizes BrowserRouter for client-side routing.
  - Defines Routes for various pages.
*/

// Importing necessary styles and components
import '../App.css';
import React from "react";
import { BrowserRouter as Main, Routes, Route } from "react-router-dom";

// Importing pages and components
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import About from '../pages/About';
import Testmonials from '../pages/Testimonials';
import CreateProfile from '../pages/CreateProfile';
import Chat from '../pages/Chat';
import MyProfile from '../pages/MyProfile';

// Importing context providers
import LoginState from '../context/auth/LoginState';
import MessagesState from '../context/user-messages/MessagesState';

// Importing custom component for route protection
import Protected from './Protected';

// Importing the Navbar component
import Navbar from './Navbar';

// Main App component
function App() {
  return (
    <>
      {/* Wrapping the entire application with the LoginState context provider */}
      <LoginState>
        {/* Wrapping the application with the MessagesState context provider */}
        <MessagesState>
          {/* Setting up the main container for the application using React Router */}
          <Main>
            {/* Including the Navbar component for navigation */}
            <Navbar />

            {/* Defining routes for different pages */}
            <Routes>
              {/* Protected route for the Home page */}
              <Route exact path="/home" element={<Protected Component={Home} />} />
              
              {/* Protected route for the CreateProfile page with dynamic username parameter */}
              <Route exact path="/profile/:username" element={<Protected Component={CreateProfile} />} />

              {/* Protected route for the Chat page */}
              <Route exact path="/chat" element={<Protected Component={Chat} />} />

              {/* Protected route for the MyProfile page */}
              <Route exact path="/myprofile" element={<Protected Component={MyProfile} />} />

              {/* Route for the Login page */}
              <Route exact path="/" element={<Login />} />

              {/* Route for the SignUp page */}
              <Route exact path="/signup" element={<SignUp />} />

              {/* Route for the About page */}
              <Route exact path="/about" element={<About />} />

              {/* Route for the Testimonials page */}
              <Route exact path="/testimonials" element={<Testmonials />} />
            </Routes>
          </Main>
        </MessagesState>
      </LoginState>
    </>
  );
}

// Exporting the App component as the default export
export default App;