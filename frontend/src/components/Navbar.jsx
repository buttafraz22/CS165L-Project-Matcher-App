import '../App.css';
import React, { useContext } from "react";
import loginContext from '../context/auth/loginContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Navbar() {
    const loginInfo = useContext(loginContext);
    const navigate = useNavigate();

    const {userId : id} = loginInfo;
    const {login : login} = loginInfo;

    console.log(loginInfo);
    console.log(id);
    console.log(login);

    function onLogout() {
        loginInfo.login = false;
        loginInfo.userId = null;
        console.log(loginInfo);
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 w-100 position-fixed">
            <Link className="navbar-brand text-light ml-5" to={login ? "/home" : "/"}>Matcher App</Link>
            <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mx-5" id="navbarNav">
                <ul className="navbar-nav ml-auto nav-items">
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/about">About <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/testimonials">Testimonials</Link>
                    </li>
                    {
                        loginInfo.login && (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-link text-light" onClick={onLogout}>Logout</button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/chat">Chat</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/home">Find your partner</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="#">
                                        My Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <div className='profile-image'>
                                        <img src="/images/profile-picture.jpg" alt='profile-image' />
                                    </div>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
  }
  
  export default Navbar;