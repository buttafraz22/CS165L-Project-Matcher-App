import '../App.css';
import Navbar from '../components/Navbar';
import InputField from '../components/InputField';
import {useContext, useReducer, useState} from 'react';
import Form from 'react-bootstrap/Form';
import React from "react";
import { useNavigate } from 'react-router-dom';
import loginContext from '../context/auth/loginContext';

const reducer = (currentState, action) => {
    switch (action.type){
        case "setUsername":
            return {
                ...currentState,
                username: action.payload,
            }
        case "setPassword":
            return {
                ...currentState,
                password: action.payload,
            }
        case "setEmail":
            return {
                ...currentState,
                email: action.payload,
            }
        case "setGender":
            return {
                ...currentState,
                gender: action.payload,
            }
        default:
            return {}
    }
}

function SignUp() {

    const [state, dispatch] = useReducer(reducer, {
            username: '',
            password: '',
            email: '',
            gender: '',
        }
    );

    const [age, setAge] = useState(18);
    const loginInfo = useContext(loginContext);

    const navigate = useNavigate();

    function onSignUp() {
        let signUpData= {
            ...state,
            age
        };

        let check = checkConstraints(signUpData);

        if (!check.isFailed) {
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpData)
              };
            fetch('http://localhost:5000/api/users', options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message === "Username already exist") {
                    alert(data.message);
                } else if (data.message === "Email already exist") {
                    alert(data.message);
                } else {
                    alert(data.message);
                    loginInfo.updateLogin(true);
                    navigate('/profile/'+state.username);
                }
            })
            .catch(error => console.error(error));
        } else {
            alert(check.message);
        }


    }

    function checkConstraints(signUpData) {
        let message = "";
        for (let key in signUpData) {
            if (signUpData.hasOwnProperty(key)) {
                if (
                    (typeof signUpData[key] === 'string' && signUpData[key].trim() === '') ||
                    (typeof signUpData[key] === 'number' && signUpData[key] < 18)
                ) {
                    message = `Please fill out the ${key}`;
                    return {isFailed: true, message};
                }
            }
        }
        if (signUpData.password.length < 8) {
            message = "Password must be at least 8 characters long.";
            return {isFailed: true, message};
        } if (signUpData.age < 18) {
            message = "Age must be at least 18.";
            return {isFailed: true, message};
        }
        return {isFailed: false}
    }

    function onChanged(e) {
        let value = e.target.value;
        let name = e.target.name;

        if (name === "username") {
            dispatch({type: 'setUsername', payload: value});
        } else if (name === "password") {
            console.log("I am in");
            dispatch({type: 'setPassword', payload: value});
        } else if (name === "email") {
            dispatch({type: 'setEmail', payload: value});
        } else if (name === "age") {
            dispatch({type: 'setAge', payload: value});
        }
    }

    function onSelectGender(e) {
        let value = e.target.value;
        if (value == 1) {
            dispatch({type: 'setGender', payload: 'male'});
        } else if (value == 2){
            dispatch({type: 'setGender', payload: 'female'});
        }
    }

    return (
        <>
            <Navbar />
            <div className="signin-signup-grid">
                <div className="image-wrapper">
                    <img src="./images/image1.png" alt="" />
                </div>
                <form className="mr-5 mb-5" onSubmit={(e)=>e.preventDefault()}>
                    <h2>SignUp</h2>
                    <div className="form-inputs">
                        <InputField 
                            name='username'
                            type='text'
                            placeholder='Username'
                            value={state.username}
                            onChanged={onChanged}
                        />
                        <InputField 
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={state.password}
                            onChanged={onChanged}
                        />
                        <InputField 
                            name='email'
                            type='email'
                            placeholder='Email'
                            value={state.email}
                            onChanged={onChanged}
                        />
                        <div className="form-group">
                            <label htmlFor="ageInput">Age</label>
                            <input type="number" name="age" id="ageInput" className="form-control" value={age} onChange={onChanged} min={18} max={70}/>
                        </div>
                        <Form.Select className='w-100 border p-2 rounded' aria-label="Default select example" onChange={onSelectGender}>
                            <option>Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </Form.Select>
                    </div>
                    <div className="form-buttons">
                        <a className="btn btn-secondary mb-3 w-100" onClick={onSignUp}>Sign Up</a>
                        <a className="btn btn-outline-secondary w-100" href='/'>Login</a>
                    </div>
                </form>
            </div>
        </>
    );
  }
  
  export default SignUp;