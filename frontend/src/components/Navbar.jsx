/*
  Navbar Component

  This component represents the navigation bar for the application. It includes links
  to various pages, such as About, Testimonials, Chat, Find Your Partner, My Profile,
  and a Logout button for authenticated users. The component uses the React context API
  to manage user authentication and profile information.

  Dependencies:
  - React: Core library for building UI components.
  - react-router-dom: Library for routing in React applications.
  - loginContext: Custom context for managing user authentication and profile data.
*/

// Importing necessary dependencies and styles
import '../App.css';
import React, { useContext } from "react";
import loginContext from '../context/auth/loginContext';
import { Link, useNavigate } from 'react-router-dom';

// Navbar Component definition
function Navbar() {
    // Accessing user authentication and profile data from the context
    const loginInfo = useContext(loginContext);
    const navigate = useNavigate();

    const { login } = loginInfo;

    // Logout function to clear user data and redirect to the home page
    function onLogout() {
        loginInfo.updateLogin(false);
        loginInfo.updateUserId(null);
        loginInfo.updateMinAge(18);
        loginInfo.updateMaxAge(70);
        loginInfo.updateUsername(null);
        loginInfo.updateMyProfile(null);
        navigate("/");
    }

    // Rendered JSX for Navbar component
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 w-100 position-fixed">
            {/* Application logo and home link */}
            <Link className="navbar-brand text-light ml-5" to={login ? "/home" : "/"}>Matcher App</Link>
            
            {/* Navbar toggle button for smaller screens */}
            <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar content with various links */}
            <div className="collapse navbar-collapse mx-5" id="navbarNav">
                <ul className="navbar-nav ml-auto nav-items">
                    {/* About link */}
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/about">About <span className="sr-only">(current)</span></Link>
                    </li>
                    
                    {/* Testimonials link */}
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/testimonials">Testimonials</Link>
                    </li>

                    {/* Conditional rendering for authenticated users */}
                    {loginInfo.login && (
                        <>
                            {/* Logout button */}
                            <li className="nav-item">
                                <button className="btn btn-link text-light" onClick={onLogout}>Logout</button>
                            </li>
                            
                            {/* Chat link */}
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/chat">Chat</Link>
                            </li>
                            
                            {/* Find Your Partner link */}
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/home">Find your partner</Link>
                            </li>
                            
                            {/* My Profile link */}
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/myprofile"> My Profile </Link>
                            </li>
                            
                            {/* User profile image */}
                            <li className="nav-item">
                                <div className='profile-image'>
                                    <img src={loginInfo.myProfile === null ? "/images/profile-picture.jpg" : loginInfo.myProfile.image} alt='profile-image' />
                                </div>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

// Export the Navbar component
export default Navbar;