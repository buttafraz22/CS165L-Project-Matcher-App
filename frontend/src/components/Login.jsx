import '../App.css';
import Navbar from './Navbar';
import InputField from './InputField';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onChanged(e) {
        let value = e.target.value;
        let name = e.target.name;
        if (name === 'username') {
            setUsername(value);
        } else {
            setPassword(value);
        }
    }

    function onLogin() {
        const userData = {username, password};

        console.log(userData);

        let check = checkConstraints(userData);

        if (check === "All is good") {
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
              };
            fetch('http://localhost:5000/api/login', options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        } else {
            alert(check);
        }

    }

    function checkConstraints(signUpData) {
        for (let key in signUpData) {
            if (signUpData.hasOwnProperty(key)) {
                if (typeof signUpData[key] === 'string' && signUpData[key].trim() === '') {
                   return `Please fill out the ${key}`;
                }
            }
        }
        return "All is good"
    }

    return (
        <>
            <Navbar />
            <div className="login">
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
                        <a className="btn btn-secondary mb-3 w-100" onClick={onLogin}>Login</a>
                        <a className="btn btn-outline-secondary w-100" href='/signup'>Sign Up</a>
                    </div>
                </form>
            </div>
        </>
    );
  }
  
  export default Login;