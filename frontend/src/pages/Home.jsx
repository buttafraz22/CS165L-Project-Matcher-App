import '../App.css';
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import loginContext from '../context/auth/loginContext';

function Home() {

    const loginInfo = useContext(loginContext);
    const userId = loginInfo.userId;
    const [userProfiles, setUserProfiles] = useState([]);
    const [profileNum, setProfileNum] = useState(0);

    useEffect(()=>{
        getAllUserProfiles();
        getMyProfile();
    }, [])

    async function getAllUserProfiles() {
        try {
            const response = await axios.get(`http://localhost:5000/api/profiles/?userId=${userId}&minAge=${loginInfo.minAge}&maxAge=${loginInfo.maxAge}`);
            
            if (response.data.message) {
                setUserProfiles(response.data.profilesFound);
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getMyProfile() {
        try {
            const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
            
            if (response.data.message) {
                loginInfo.updateMyProfile(response.data.profileFound);
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div id='user-profiles'>
            {
                userProfiles.length !== 0 ?
                userProfiles.slice(profileNum, profileNum+1)
                .map((userProfile)=>{
                    return <UserProfile key={userProfile._id} totalProfiles={userProfiles.length} setProfileNum={setProfileNum} name={userProfile.name} image={userProfile.image} aboutMe={userProfile.aboutMe} userId1={userId} userId2={userProfile.userId} />
                })
                :
                <div className="selected-chat">
                    <h1 className='text-center'>There are no profiles available yet!</h1>
                </div>
            }
            </div>
        </>
    );
}

export default Home;