import { useParams } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/Navbar';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import UserProfile from '../components/UserProfile';

function Home() {

    const userId = useParams().userId;
    const [profileImage, setProfileImage] = useState('');
    const [userProfiles, setUserProfiles] = useState([]);
    const [profileNum, setProfileNum] = useState(0);

    useEffect(()=>{
        getAllUserProfiles();
    }, [])

    function getAllUserProfiles() {
        axios.get('http://localhost:5000/api/profiles/'+userId)
        .then(async res=> {
            if (res.data.message) {
                console.log(res.data.profilesFound);
                setUserProfiles(res.data.profilesFound);
            } else {
                alert('Error');
            }
        })
        .catch(err=>console.log(err));
    }

    return (
        <>
            <Navbar loggedInStatus="LOGGED_IN" image=""/>
            <div id='user-profiles'>
            {
                userProfiles.slice(profileNum, profileNum+1).map((userProfile)=>{
                    return <UserProfile key={userProfile._id} totalProfiles={userProfiles.length} setProfileNum={setProfileNum} name={userProfile.name} aboutMe={userProfile.aboutMe} userId1={userId} userId2={userProfile.userId} />
                })
            }
            </div>
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