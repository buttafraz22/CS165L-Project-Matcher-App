import { useContext, useEffect } from "react";
import loginContext from "../context/auth/loginContext";
import { useNavigate } from "react-router-dom";
import React from 'react';


function Protected(props) {

    const {Component} = props;
    const loginInfo = useContext(loginContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!loginInfo.login) {
            navigate("/");
        }
    },[])

    return (
        <div>
            {loginInfo.login && <Component />}
        </div>
    )
}

export default Protected;