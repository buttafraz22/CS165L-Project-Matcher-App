import '../App.css';
import Navbar from '../components/Navbar';
import InputField from '../components/InputField';
import { useState } from 'react';
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import loginContext from '../context/auth/loginContext';
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginInfo = useContext(loginContext);

    const navigate = useNavigate();

    function onChanged(e) {
        let value = e.target.value;
        let name = e.target.name;
        if (name === 'username') {
            setUsername(value);
        } else {
            setPassword(value);
        }
    }

    async function onLogin() {
        const userData = {username, password};

        const check = checkConstraints(userData);

        if (!check.isFailed) {
            const response = await axios.post('http://localhost:5000/api/login', userData);
            if (response.data.userFound) {
                const userId = response.data.userFound._id;
                loginInfo.updateLogin(true);
                loginInfo.updateUserId(userId);
                navigate('/home');
            } else {
                alert("Username and password are incorrect.");
            }
        } else {
            alert(check.message);
        }
    }

    function checkConstraints(loginData) {
        for (let key in loginData) {
            if (loginData.hasOwnProperty(key)) {
                if (loginData[key] === '') {
                    console.log("sds");
                   return {isFailed: true, message: `Please fill out the ${key}`};
                }
            }
        }
        return {isFailed: false}
    }

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
                        <a href="#"><small id="emailHelp" className="form-text text-muted" style={{textAlign: 'end'}}>Forget Password?</small></a>
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