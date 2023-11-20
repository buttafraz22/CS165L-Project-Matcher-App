import Navbar from "./Navbar";
import InputField from "./InputField";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import pako from 'pako';

function CreateProfile() {

    const [name, setName] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [profileType, setProfileType] = useState('default');
    const [relationshipStatus, setRelationshipStatus] = useState('default');
    const [profilePicture, setProfilePicture] = useState("./images/profile-picture.jpg");

    const navigate = useNavigate();
    // let params = useParams();

    function onSubmitteed(e) {
        // let username = params;

        // console.log(username);

        // let profileData = {
        //     name,
        //     aboutMe,
        //     // profilePicture,
        //     relationshipStatus,
        //     profileType,
        //     username,
        // }

        // e.preventDefault();
        // const options = {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(profileData)
        //   };
        // fetch('http://localhost:5000/api/profiles', options)
        // .then(response => response.json())
        // .then(data => {
        //     if (data.message === "Profile has been created") {
        //         alert(data.message);
        //         navigate('/home')
        //     } else {
        //         alert(data.message);
        //     }
        // })
        // .catch(error => console.error(error));
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

    function onCleared() {
        setName('');
        setAboutMe('');
        setProfileType('default');
        setRelationshipStatus('default');
        setProfilePicture('./images/profile-picture.jpg')
    }

    function onChanged(e) {
        let value = e.target.value;
        let inputName = e.target.name;
        if (inputName === 'name') {
            setName(value);
        } else {
            setAboutMe(value);
        }
        console.log("Name: ", name);
        console.log("About me: ", aboutMe);
    }

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setProfilePicture(base64);
    }

    return (
        <>
            <Navbar/>
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
                                    <option value="default">Profile Type</option>
                                    <option value="partner">Partner</option>
                                    <option value="parent">Parent</option>
                                </Form.Select>
                                <Form.Select name="relationshipStatus" className='w-100 border p-2 mb-3 rounded' aria-label="Default select example" onChange={onSelected} value={relationshipStatus}>
                                    <option value="default">Relationship Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </Form.Select>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="profile-upload">
                                        <img src={profilePicture} className="custom-picture" />
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
                        <a className="btn btn-secondary mb-3 w-100" onClick={onSubmitteed}>Create</a>
                        <a className="btn btn-outline-secondary w-100" onClick={onCleared}>Clear all</a>
                    </div>
                </form>
                <div className="image-wrapper">
                    <img src="./images/image2.jpg" alt="" />
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