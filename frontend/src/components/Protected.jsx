/*
  Protected Component

  This component serves as a protective wrapper around other components that require
  authentication. It checks the user's login status using the loginContext and redirects
  to the home page if the user is not authenticated. If the user is authenticated, it renders
  the provided component.

  Dependencies:
  - React: Core library for building UI components.
  - react-router-dom: Library for routing in React applications.
  - loginContext: Custom context for managing user authentication and profile data.
*/

// Importing necessary dependencies
import { useContext, useEffect } from "react";
import loginContext from "../context/auth/loginContext";
import { useNavigate } from "react-router-dom";
import React from 'react';

// Protected Component definition
function Protected(props) {
    // Destructuring the provided component from props
    const { Component } = props;
    
    // Accessing user authentication data from the context
    const loginInfo = useContext(loginContext);
    const navigate = useNavigate();

    // useEffect to check the user's login status and redirect if not authenticated
    useEffect(() => {
        if (!loginInfo.login) {
            navigate("/");
        }
    }, [])

    // Rendered JSX for the Protected component
    return (
        <div>
            {/* Render the provided component only if the user is authenticated */}
            {loginInfo.login && <Component />}
        </div>
    )
}

// Export the Protected component
export default Protected;
