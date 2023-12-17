/*
  Home Page

  This component represents the Home page of the halal matchmaking mobile application.
  It displays user profiles based on the user's preferences and allows navigation to other profiles.
  The component fetches user profiles and the user's own profile from the server.

  Dependencies:
  - UserProfile: Custom component for rendering individual user profiles.
  - React Router: For navigation to other profiles.
  - useContext: React hook for accessing the login context.
  - useEffect, useState: React hooks for handling side effects and component state.
  - axios: HTTP client for making API requests.
*/

import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import loginContext from '../context/auth/loginContext';

function Home() {

    // Accessing login context
    const loginInfo = useContext(loginContext);

    // State variables to store user profiles and current profile index
    const userId = loginInfo.userId;
    const [userProfiles, setUserProfiles] = useState([]);
    const [profileNum, setProfileNum] = useState(0);

    // useEffect to fetch user profiles and the user's own profile on component mount
    useEffect(() => {
        getAllUserProfiles();
        getMyProfile();
    }, []);

    // Function to fetch all user profiles based on user preferences
    async function getAllUserProfiles() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/profiles/?userId=${userId}&minAge=${loginInfo.minAge}&maxAge=${loginInfo.maxAge}`);
            
            // Handling successful API response or error
            if (response.data.message) {
                setUserProfiles(response.data.profilesFound);
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Function to fetch the user's own profile
    async function getMyProfile() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/profile/${userId}`);
            
            // Handling successful API response or error
            if (response.data.message) {
                loginInfo.updateMyProfile(response.data.profileFound);
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Rendered JSX for the Home page
    return (
        <>
            <div id='user-profiles'>
            {
                userProfiles.length !== 0 ?
                userProfiles.slice(profileNum, profileNum + 1)
                .map((userProfile) => {
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