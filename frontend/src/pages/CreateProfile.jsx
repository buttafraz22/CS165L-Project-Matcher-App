import InputField from "../components/InputField";
import React from "react";
import Form from 'react-bootstrap/Form';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';


function CreateProfile() {

    const [name, setName] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [profileType, setProfileType] = useState(null);
    const [relationshipStatus, setRelationshipStatus] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [visualizePicture, setVisualizePicture] = useState("/images/profile-picture.jpg");

    const navigate = useNavigate();
    let params = useParams();

    function onSubmitteed(e) {
        e.preventDefault();
        let username = params;

        let profileData = {
            name,
            aboutMe,
            profileType,
            relationshipStatus,
            ...username,
            image: visualizePicture
        }

        const check = checkConstraints({...profileData, profilePicture});

        if (!check.isFailed) {
            const formData = new FormData();
            formData.append('file', profilePicture);
            formData.append('profileData', JSON.stringify(profileData));
    
            axios.post('http://localhost:5000/api/profiles', formData)
            .then(res=>{
                console.log(res.data);
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/home');
                } else {
                    alert('Error');
                }
            })
            .catch(err=>console.log(err));
        } else {
            alert(check.message);
        }
    }

    function checkConstraints(profileData) {
        for (let key in profileData) {
            if (profileData.hasOwnProperty(key)) {
                if (
                    (profileData[key] === '') || (profileData[key] === null) || (profileData[key] === "disable")
                )  {
                    return {isFailed: true, message: `Please fill out the ${key}`};
                }
            }
        }
        return {isFailed: false};
    }

    function onSelected(e) {
        const value = e.target.value;
        const selectName = e.target.name;
        if (selectName === 'profileType'){
            setProfileType(value);
        } else {
            setRelationshipStatus(value);
        }
    }

    function onCleared(e) {
        e.preventDefault()
        setName('');
        setAboutMe('');
        setProfileType(null);
        setRelationshipStatus(null);
        setProfilePicture(null);
        setVisualizePicture('/images/profile-picture.jpg');
    }

    function onChanged(e) {
        let value = e.target.value;
        let inputName = e.target.name;
        if (inputName === 'name') {
            setName(value);
        } else {
            setAboutMe(value);
        }
    }

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setProfilePicture(file);
        setVisualizePicture(base64);
    }

    return (
        <>
            <div className="profile-grid">
                <form className="mx-5 mb-5" onSubmit={(e)=>e.preventDefault()}>
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
                                <Form.Select name="relationshipStatus" className='w-100 border p-2 mb-3 rounded' aria-label="Default select example" onChange={onSelected} value={relationshipStatus}>
                                    <option>Relationship Status</option>
                                    <option value="single">Single</option>
                                    <option value="divorced">Divorced</option>
                                </Form.Select>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="profile-upload">
                                        <img src={visualizePicture} alt="Add image" className="custom-picture" />
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
                            <textarea className="form-control" id="exampleFormControlTextarea1" name="aboutMe" rows="3" placeholder="About me" value={aboutMe} onChange={onChanged}></textarea>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button className="btn btn-secondary mb-3 w-100" onClick={onSubmitteed}>Create</button>
                        <button className="btn btn-outline-secondary w-100" onClick={onCleared}>Clear all</button>
                    </div>
                </form>
                <div className="image-wrapper" style={{borderRadius: "20px 0 0 20px"}}>
                    <img src="/images/image2.jpg" alt="image" />
                </div>
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

export default CreateProfile;