/*
  LoginState

  This module defines a React component that serves as the state provider for login-related information.
  It uses the LoginContext to share login state and related functions with other components.

  Dependencies:
  - React: Core library for building UI components.
  - LoginContext: Context for managing login-related information.
*/

// Importing useState and LoginContext from React
import { useState } from "react";
import LoginContext from "./loginContext";

// LoginState component that manages login-related state and provides it to its children
function LoginState(props) {
    // State variables for login-related information
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [myProfile, setMyProfile] = useState(null);
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(70);

    // Functions to update login-related state
    function updateLogin(isLogin) {
        setLogin(isLogin);
    }

    function updateUserId(id) {
        setUserId(id);
    }

    function updateUsername(uname) {
        setUsername(uname);
    }

    function updateMyProfile(profile) {
        setMyProfile(profile);
    }

    function updateMinAge(age) {
        setMinAge(age);
    }

    function updateMaxAge(age) {
        setMaxAge(age);
    }

    return (
        <>
            {/* Providing login-related state and functions through the LoginContext */}
            <LoginContext.Provider value={{ login, userId, username, myProfile, minAge, maxAge, updateUserId, updateLogin, updateUsername, updateMyProfile, updateMinAge, updateMaxAge }}>
                {/* Rendering the children components wrapped in the LoginContext.Provider */}
                {props.children}
            </LoginContext.Provider>
        </>
    )
}

// Exporting the LoginState component for use in other modules
export default LoginState;