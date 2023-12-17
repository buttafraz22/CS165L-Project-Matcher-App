/*
  CreateProfile Page

  This component represents the page for users to create and set up their profiles.
  It includes input fields for name, profile type, relationship status, profile picture,
  and an about me section. Users can submit, clear, and visualize their profile picture.

  Dependencies:
  - InputField: Custom component for rendering input fields.
  - react-bootstrap/Form: Bootstrap form components.
  - useState, useRef: React hooks for state and ref management.
  - useNavigate: React Router hook for navigation.
  - useParams: React Router hook for accessing route parameters.
  - axios: Library for making HTTP requests.
*/

import React, { useState, useRef } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";
import Form from 'react-bootstrap/Form';

function CreateProfile() {

    // State variables for managing profile creation
    const [name, setName] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [profileType, setProfileType] = useState('');
    const [relationshipStatus, setRelationshipStatus] = useState('married');
    const [profilePicture, setProfilePicture] = useState(null);
    const [visualizePicture, setVisualizePicture] = useState("/images/profile-picture.jpg");

    // Hooks for navigation and route parameters
    const navigate = useNavigate();
    let params = useParams();

    // Ref for relationship status dropdown and state for disabling it conditionally
    const relationshipStatusRef = useRef(null);
    const [isRelationshipStatusDisabled, setRelationshipStatusDisabled] = useState(false);

    // Function to handle form submission
    async function onSubmitteed(e) {
        try {
            e.preventDefault();
            const username = params;

            // Constructing profile data object
            const profileData = {
                name,
                aboutMe,
                profileType,
                relationshipStatus,
                ...username,
                image: visualizePicture,
            };

            // Checking constraints before submitting
            const check = checkConstraints({ ...profileData, profilePicture });

            if (!check.isFailed) {
                // Creating FormData for profile picture upload
                const formData = new FormData();
                formData.append('file', profilePicture);
                formData.append('profileData', JSON.stringify(profileData));

                // Making a POST request to create the profile
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/profiles`, formData);

                // Handling success or error messages
                if (response.data.message) {
                    alert(response.data.message);
                    navigate('/home');
                } else {
                    alert('Error');
                }
            } else {
                alert(check.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Function to check constraints for required fields
    function checkConstraints(profileData) {
        for (let key in profileData) {
            if (profileData.hasOwnProperty(key)) {
                if (
                    (profileData[key] === '') || (profileData[key] === null) || (profileData[key] === "disable")
                )  {
                    return { isFailed: true, message: `Please fill out the ${key}` };
                }
            }
        }
        return { isFailed: false };
    }

    // Function to handle selection in dropdowns
    function onSelected(e) {
        const value = e.target.value;
        const selectName = e.target.name;
        if (selectName === 'profileType') {
            if (value === "parent") {
                setRelationshipStatusDisabled(true);
            } else {
                setRelationshipStatusDisabled(false);
            }
            setProfileType(value);
        } else {
            setRelationshipStatus(value);
        }
    }

    // Function to clear all input fields
    function onCleared(e) {
        e.preventDefault()
        setName('');
        setAboutMe('');
        setProfileType(null);
        setRelationshipStatus(null);
        setProfilePicture(null);
        setVisualizePicture('/images/profile-picture.jpg');
    }

    // Function to handle input changes in text areas
    function onChanged(e) {
        let value = e.target.value;
        let inputName = e.target.name;
        if (inputName === 'name') {
            setName(value);
        } else {
            setAboutMe(value);
        }
    }

    // Function to handle file upload and convert it to base64
    async function handleFileUpload(e) {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setProfilePicture(file);
        setVisualizePicture(base64);
    }

    // Rendered JSX for the CreateProfile page
    return (
        <>
            <div className="profile-grid">
                <form className="mx-5 mb-5" onSubmit={onSubmitteed}>
                    <h2 className="text-center">Setup Profile</h2>
                    <div className="form-inputs">
                        <div className="input-sections">
                            <div>
                                <InputField 
                                    name='name'
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChanged={onChanged}
                                />
                                <Form.Select name="profileType" className='w-100 border p-2 mb-3 rounded' aria-label="Default select example" onChange={onSelected} value={profileType}>
                                    <option>Profile Type</option>
                                    <option value="partner">Partner</option>
                                    <option value="parent">Parent</option>
                                </Form.Select>
                                <Form.Select name="relationshipStatus" className='w-100 border p-2 mb-3 rounded' aria-label="Default select example" onChange={onSelected} value={relationshipStatus} ref={relationshipStatusRef} disabled={isRelationshipStatusDisabled}>
                                    <option>Relationship Status</option>
                                    <option value="single">Single</option>
                                    <option value="divorced">Divorced</option>
                                </Form.Select>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="profile-upload">
                                        <img src={visualizePicture} alt="visualize-img" className="custom-picture" />
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
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">About me</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" name="aboutMe" rows="3" maxLength={350} placeholder="About me" value={aboutMe} onChange={onChanged}></textarea>
                            <p className="text-right">{aboutMe.length}/350</p>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button className="btn btn-secondary mb-3 w-100" type="submit">Create</button>
                        <button className="btn btn-outline-secondary w-100" onClick={onCleared}>Clear all</button>
                    </div>
                </form>
                <div className="image-wrapper" style={{borderRadius: "20px 0 0 20px"}}>
                    <img src="/images/image2.jpg" alt="create-profile-background-img" />
                </div>
            </div>
        </>
    );
}

// Function to convert a file to base64 format
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

export default CreateProfile;