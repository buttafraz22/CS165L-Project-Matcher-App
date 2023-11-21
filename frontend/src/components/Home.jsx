import { useParams } from 'react-router-dom';
import '../App.css';
import Navbar from './Navbar';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import UserProfile from './UserProfile';

function Home() {

    const userId = useParams().userId;
    const [profileImage, setProfileImage] = useState('');

    useEffect(()=>{
        // axios.get('http://localhost:5000/api/profile/'+userId)
        // .then(res=>{
        //     if (res.data.message) {
        //         console.log(res.data.profileFound);
        //         // const base64 = convertToBase64(res.data.profileFound.profilePicture);
        //         // setProfileImage(base64);
        //     } else {
        //         alert('Error');
        //     }
        // })
        // .catch(err=>console.log(err));
    }, [])

    return (
        <>
            <Navbar loggedInStatus="LOGGED_IN" image=""/>
            <UserProfile />
        </>
    );
}

function convertToBase64(file){ 
    return new Promise((response, reject)=>{
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            response(fileReader.result)
        }
        fileReader.onerror = (err) => {
            reject(err)
        }
    })
}

export default Home;