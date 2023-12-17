/*
  MyProfile Component

  This component represents the user's profile page, where they can view, edit, and update their profile information.
  The component includes features like changing the profile picture, updating name and about me, and adjusting age preferences.

  Dependencies:
  - React: Core library for building UI components.
  - useContext: React hook for accessing the login context.
  - useState: React hook for handling component state.
  - useNavigate: React Router hook for navigation.
  - axios: HTTP client for making API requests.
*/

import { useContext, useState } from "react";
import loginContext from "../context/auth/loginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyProfile() {
    // Accessing login context
    const loginInfo = useContext(loginContext);
    const navigate = useNavigate();

    // State variables for profile information and preferences
    const [name, setName] = useState(loginInfo.myProfile.name);
    const [aboutMe, setAboutMe] = useState(loginInfo.myProfile.aboutMe);
    const [visualizePicture, setVisualizePicture] = useState(loginInfo.myProfile.image);
    const [minAge, setMinAge] = useState(loginInfo.minAge);
    const [maxAge, setMaxAge] = useState(loginInfo.maxAge);

    // Function to handle changes in age preferences
    function changePreference(e) {
        let value = e.target.value;
        let inputName = e.target.name;
        if (inputName === 'min') {
            // Parse the input value to ensure it's a number
            let newMinAge = parseInt(value, 10);
            
            // Check if newMinAge is valid and less than or equal to maxAge
            if (!isNaN(newMinAge) && newMinAge <= maxAge - 1) {
                setMinAge(newMinAge);
            }
        } else {
            // Parse the input value to ensure it's a number
            let newMaxAge = parseInt(value, 10);
        
            // Check if newMaxAge is valid and greater than or equal to minAge
            if (!isNaN(newMaxAge) && newMaxAge >= minAge + 1) {
                setMaxAge(newMaxAge);
            }
        }
    }

    // Function to handle profile deletion
    async function onDelete() {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/profile/${loginInfo.myProfile.userId}`);
        
            if (response.data.message) {
                alert(response.data.message);
                loginInfo.updateLogin(false);
                loginInfo.updateUserId(null);
                loginInfo.updateUsername(null);
                loginInfo.updateMyProfile(null);
                navigate('/');
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error(error);
        }        
    }

    // Function to handle profile update
    async function onUpdate() {
        try {
            let formData = {
                name,
                aboutMe,
                image: visualizePicture
            };
        
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_LINK}/api/profile/${loginInfo.myProfile.userId}`, formData);
        
            console.log(response.data);
        
            if (response.data.message) {
                alert(response.data.message);
                loginInfo.updateMyProfile(response.data.profileUpdated);
                navigate('/myprofile');
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Function to handle changes in input fields
    function onChanged(e) {
        let value = e.target.value;
        let inputName = e.target.name;
        if (inputName === 'name') {
            setName(value);
        } else {
            setAboutMe(value);
        }
    }

    // Function to handle file upload for profile picture
    async function handleFileUpload(e) {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setVisualizePicture(base64);
    }

    // Function to apply changes in age preferences
    async function onChangePreference() {
        loginInfo.updateMinAge(minAge);
        loginInfo.updateMaxAge(maxAge);
    }

    // Rendered JSX for MyProfile component
    return (
        <div className="my-profile">
            {/* Profile Information */}
            <div className="my-profile-image-wrapper">
                <img src={loginInfo.myProfile.image} alt="my-profile-img" />
            </div>
            <h1 className="mb-0">{loginInfo.myProfile.name}</h1>
            <p className="mt-0 mb-4">{`@${loginInfo.username}`}</p>
            <p className="text-justify">{loginInfo.myProfile.aboutMe}</p>

            {/* Delete Profile Button */}
            <button className="btn btn-secondary btn-lg w-100 mb-3" onClick={onDelete}>
                <i className="fa-solid fa-trash mr-3"></i>
                Delete My Profile
            </button>

            {/* Edit Profile Modal */}
            <div className="modal fade" id="modalContactForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
                {/* Modal Content */}
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Edit Profile</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mx-3">
                            {/* Profile Picture Upload */}
                            <div className="form-group p-0 m-0">
                                <label htmlFor="profile-upload">
                                    <img src={visualizePicture} alt="select-img" className="custom-picture" />
                                </label>
                                <input 
                                    type="file"
                                    name="profilePicture"
                                    label="Image"
                                    id="profile-upload"
                                    className="form-control custom-picture-upload"
                                    accept=".jpeg, .png, jpg"
                                    onChange={handleFileUpload}
                                />
                            </div>

                            {/* Name Input */}
                            <div className="md-form">
                                <i className="fas fa-user prefix grey-text"></i>
                                <input name="name" type="text" id="form34" className="form-control validate" value={name} onChange={onChanged}/>
                                <label data-error="wrong" data-success="right" htmlFor="form34">Your name</label>
                            </div>

                            {/* About Me Textarea */}
                            <div className="md-form">
                                <i className="fas fa-pencil prefix grey-text"></i>
                                <textarea name="aboutMe" type="text" id="form8" className="md-textarea form-control" rows="4" value={aboutMe} onChange={onChanged}></textarea>
                                <label data-error="wrong" data-success="right" htmlFor="form8">About me</label>
                            </div>
                        </div>
                        {/* Modal Footer */}
                        <div className="modal-footer d-flex justify-content-center">
                            <button className="btn btn-secondary btn-lg w-100 mx-4" onClick={onUpdate} data-dismiss="modal" aria-label="Close">Edit <i className="fa-solid fa-pen-to-square"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Button */}
            <div className="text-center">
                <button className="btn btn-outline-secondary btn-lg w-100 mb-3" data-toggle="modal" data-target="#modalContactForm">
                    <i className="fa-solid fa-pen-to-square mr-3"></i>
                    Edit My Profile
                </button>
            </div>

            {/* Change Preference Modal */}
            <div className="modal fade" id="changePreference" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
                {/* Modal Content */}
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Change Preference</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mx-3">
                            {/* Age Range Slider */}
                            <div className="md-form">
                                <h4 className="text-left">Age</h4>
                                <div className="range">
                                    <div className="range-slider">
                                        <span className="range-selected"></span>
                                    </div>
                                    <input type="range" className="w-100" name="min" min="18" max="70" value={minAge} onChange={changePreference} step="1"/>
                                    <label htmlFor="min">Min</label>
                                    <input className="ml-3" type="number" name="min" value={minAge} onChange={changePreference} style={{width: "10%"}}/>
                                    <input type="range" className="w-100" name="max" min="18" max="70" value={maxAge} onChange={changePreference} step="1"/>
                                    <label htmlFor="max">Max</label>
                                    <input className="ml-3" type="number" name="max" value={maxAge} onChange={changePreference} style={{width: "10%"}}/>
                                </div> 
                            </div>
                        </div>
                        {/* Modal Footer */}
                        <div className="modal-footer d-flex justify-content-center">
                            <button className="btn btn-secondary btn-lg w-100 mx-4" onClick={onChangePreference} data-dismiss="modal" aria-label="Close">
                                <i className="fa-solid fa-sliders mr-3"></i>
                                Change Preference
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Preference Button */}
            <div className="text-center">
                <button className="btn btn-outline-secondary btn-lg w-100 mb-3"  data-toggle="modal" data-target="#changePreference">
                    <i className="fa-solid fa-sliders mr-3"></i>
                    Change Preference
                </button>
            </div>
        </div>
    )
}

// Function to convert file to base64
async function convertToBase64(file){
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

export default MyProfile;