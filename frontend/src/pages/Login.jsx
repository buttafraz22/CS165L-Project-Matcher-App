/*
  Login Page

  This component represents the Login page of the halal matchmaking mobile application.
  Users can enter their username and password to log in. It includes input fields for
  username and password, with links for forget password and signup.

  Dependencies:
  - InputField: Custom component for rendering input fields.
  - React Router: For navigation to the Signup page.
  - useContext: React hook for accessing the login context.
  - axios: Library for making HTTP requests.

  Author: [Your Name]
  Date: [Current Date]
*/

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginContext from '../context/auth/loginContext';
import axios from 'axios';
import InputField from '../components/InputField';

function Login() {

    // State variables for managing login information
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginInfo = useContext(loginContext);

    // Hook for navigation
    const navigate = useNavigate();

    // Function to handle input changes
    function onChanged(e) {
        let value = e.target.value;
        let name = e.target.name;
        if (name === 'username') {
            setUsername(value);
        } else {
            setPassword(value);
        }
    }

    // Function to handle login attempt
    async function onLogin() {
        const userData = { username, password };

        console.log(process.env.REACT_APP_SERVER_LINK);

        // Checking constraints before submitting
        const check = checkConstraints(userData);

        if (!check.isFailed) {
            try {
                // Making a POST request to the login endpoint
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/login`, userData);
                
                // Handling login success or failure
                if (response.data.userFound) {
                    const userId = response.data.userFound._id;
                    const username = response.data.userFound.username;
                    loginInfo.updateLogin(true);
                    loginInfo.updateUserId(userId);
                    loginInfo.updateUsername(username);
                    navigate('/home');
                } else {
                    alert("Username and password are incorrect.");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert(check.message);
        }
    }

    // Function to check constraints for required fields
    function checkConstraints(loginData) {
        for (let key in loginData) {
            if (loginData.hasOwnProperty(key)) {
                if (loginData[key] === '') {
                   return { isFailed: true, message: `Please fill out the ${key}` };
                }
            }
        }
        return { isFailed: false }
    }

    // Rendered JSX for the Login page
    return (
        <>
            <div className="signin-signup-grid">
                <div className="image-wrapper">
                    <img src="./images/image1.png" alt="" />
                </div>
                <form className="mr-5 mb-5" onSubmit={(e)=>e.preventDefault()}>
                    <h2>Login</h2>
                    <div className="form-inputs">
                        <InputField 
                            name='username'
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChanged={onChanged}
                        />
                        <InputField
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChanged={onChanged}
                        />
                        {/* <a href="#"><small id="emailHelp" className="form-text text-muted" style={{textAlign: 'end'}}>Forget Password?</small></a> */}
                    </div>
                    <div className="form-buttons">
                        <button className="btn btn-secondary mb-3 w-100" onClick={onLogin}>Login</button>
                        <Link className="btn btn-outline-secondary w-100" to='/signup'>Sign Up</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;