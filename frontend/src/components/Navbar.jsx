import '../App.css';
import React, { useContext } from "react";
import loginContext from '../context/auth/loginContext'

function Navbar(props) {
    const loginInfo = useContext(loginContext);

    const homeRoute = "/home/"+props.userId;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 w-100 position-fixed">
            <a className="navbar-brand text-light ml-5" href={loginInfo.login ? homeRoute: "/"}>Matcher App</a>
            <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mx-5" id="navbarNav">
                <ul className="navbar-nav ml-auto nav-items">
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/about">About <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/testimonials">Testimonials</a>
                    </li>
                    {
                        loginInfo.login && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/chat">Chat</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="#user-profiles">Find your partner</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="#">
                                        My Profile
                                    </a>
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