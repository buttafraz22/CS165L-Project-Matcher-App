import '../App.css';
import InputField from '../components/InputField';
import {useContext, useReducer, useState} from 'react';
import Form from 'react-bootstrap/Form';
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import loginContext from '../context/auth/loginContext';
import axios from 'axios';

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

    async function onSignUp() {
        try {
            let signUpData = {
                ...state,
                age,
            };
        
            let check = checkConstraints(signUpData);
        
            if (!check.isFailed) {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/users`, signUpData);
        
                if (response.data.requestedData.isFailed) {
                    alert(response.data.requestedData.message);
                } else if (response.data.requestedData.isFailed) {
                    alert(response.data.requestedData.message);
                } else {
                    alert(response.data.requestedData.message);
                    loginInfo.updateUserId(response.data.requestedData.id);
                    loginInfo.updateLogin(true);
                    loginInfo.updateUsername(state.username);
                    navigate('/profile/' + state.username);
                }
            } else {
                alert(check.message);
            }
        } catch (error) {
            console.error(error);
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
            dispatch({type: 'setUsername', payload: value.toLowerCase()});
        } else if (name === "password") {
            dispatch({type: 'setPassword', payload: value});
        } else if (name === "email") {
            dispatch({type: 'setEmail', payload: value});
        } else if (name === "age") {
            setAge(value);
        }
    }

    function onSelectGender(e) {
        let value = e.target.value;
        console.log(value);
        if (parseInt(value) === 1) {
            dispatch({type: 'setGender', payload: 'male'});
        } else if (parseInt(value) === 2){
            dispatch({type: 'setGender', payload: 'female'});
        }
    }

    return (
        <>
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
                        <button className="btn btn-secondary mb-3 w-100" onClick={onSignUp}>Sign Up</button>
                        <Link className="btn btn-outline-secondary w-100" to='/'>Login</Link>
                    </div>
                </form>
            </div>
        </>
    );
  }
  
  export default SignUp;