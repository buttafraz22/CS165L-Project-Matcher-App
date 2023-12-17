import { useContext, useState } from "react";
import loginContext from "../context/auth/loginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyProfile() {
    const loginInfo = useContext(loginContext);
    const navigate = useNavigate();

    const [name, setName] = useState(loginInfo.myProfile.name);
    const [aboutMe, setAboutMe] = useState(loginInfo.myProfile.aboutMe);
    const [visualizePicture, setVisualizePicture] = useState(loginInfo.myProfile.image);

    const [minAge, setMinAge] = useState(loginInfo.minAge);
    const [maxAge, setMaxAge] = useState(loginInfo.maxAge);

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
        setVisualizePicture(base64);
    }

    async function onChangePreference() {
        loginInfo.updateMinAge(minAge);
        loginInfo.updateMaxAge(maxAge);
    }

    return (
        <div className="my-profile">
            <div className="my-profile-image-wrapper">
                <img src={loginInfo.myProfile.image} alt="my-profile-img" />
            </div>
            <h1 className="mb-0">{loginInfo.myProfile.name}</h1>
            <p className="mt-0 mb-4">{`@${loginInfo.username}`}</p>
            <p className="text-justify">{loginInfo.myProfile.aboutMe}</p>
            <button className="btn btn-secondary btn-lg w-100 mb-3" onClick={onDelete}>
                <i className="fa-solid fa-trash mr-3"></i>
                Delete My Profile
            </button>
            <div className="modal fade" id="modalContactForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Edit Profile</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body mx-3">
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

                        <div className="md-form">
                            <i className="fas fa-user prefix grey-text"></i>
                            <input name="name" type="text" id="form34" className="form-control validate" value={name} onChange={onChanged}/>
                            <label data-error="wrong" data-success="right" htmlFor="form34">Your name</label>
                        </div>

                        <div className="md-form">
                            <i className="fas fa-pencil prefix grey-text"></i>
                            <textarea name="aboutMe" type="text" id="form8" className="md-textarea form-control" rows="4" value={aboutMe} onChange={onChanged}></textarea>
                            <label data-error="wrong" data-success="right" htmlFor="form8">About me</label>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className="btn btn-secondary btn-lg w-100 mx-4" onClick={onUpdate} data-dismiss="modal" aria-label="Close">Edit <i className="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>
            </div>
            </div>

            <div className="text-center">
                <button className="btn btn-outline-secondary btn-lg w-100 mb-3" data-toggle="modal" data-target="#modalContactForm">
                    <i className="fa-solid fa-pen-to-square mr-3"></i>
                    Edit My Profile
                </button>
            </div>

            <div className="modal fade" id="changePreference" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Change Preference</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body mx-3">
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
                    <div className="modal-footer d-flex justify-content-center">
                        <button className="btn btn-secondary btn-lg w-100 mx-4" onClick={onChangePreference} data-dismiss="modal" aria-label="Close">
                            <i className="fa-solid fa-sliders mr-3"></i>
                            Change Preference
                        </button>
                    </div>
                </div>
            </div>
            </div>

            <div className="text-center">
                <button className="btn btn-outline-secondary btn-lg w-100 mb-3"  data-toggle="modal" data-target="#changePreference">
                    <i className="fa-solid fa-sliders mr-3"></i>
                    Change Preference
                </button>
            </div>
        </div>
    )
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

export default MyProfile;