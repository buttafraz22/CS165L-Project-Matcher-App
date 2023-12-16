import { useContext, useState } from "react";
import loginContext from "../context/auth/loginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyProfile() {
    const loginInfo = useContext(loginContext);
    const navigate = useNavigate();

    const [update, setUpdate] = useState(true);
    const [name, setName] = useState(loginInfo.myProfile.name);
    const [aboutMe, setAboutMe] = useState(loginInfo.myProfile.aboutMe);
    const [visualizePicture, setVisualizePicture] = useState(loginInfo.myProfile.image);

    function changePreference(e) {
        let value = e.target.value;
        let inputName = e.target.name;
        if (inputName === 'min') {
            // Parse the input value to ensure it's a number
            let newMinAge = parseInt(value, 10);
            
            // Check if newMinAge is valid and less than or equal to maxAge
            if (!isNaN(newMinAge) && newMinAge <= loginInfo.maxAge - 1) {
                loginInfo.updateMinAge(newMinAge);
            }
        } else {
            // Parse the input value to ensure it's a number
            let newMaxAge = parseInt(value, 10);
        
            // Check if newMaxAge is valid and greater than or equal to minAge
            if (!isNaN(newMaxAge) && newMaxAge >= loginInfo.minAge + 1) {
                loginInfo.updateMaxAge(newMaxAge);
            }
        }
    }

    function onDelete() {
        axios.delete(`http://localhost:5000/api/profile/${loginInfo.myProfile.userId}`)
        .then(res=>{
            if (res.data.message) {
                alert(res.data.message);
                loginInfo.updateLogin(false);
                loginInfo.updateUserId(null);
                loginInfo.updateUsername(null);
                loginInfo.updateMyProfile(null);
                navigate('/');
            } else {
                alert('Error');
            }
        })
        .catch(err=>console.log(err));
    }

    function onUpdate() {
        let formData = {
            name,
            aboutMe,
            image: visualizePicture
        };
        axios.patch(`http://localhost:5000/api/profile/${loginInfo.myProfile.userId}`, formData)
        .then(res=>{
            console.log(res.data);
            if (res.data.message) {
                alert(res.data.message);
                loginInfo.updateMyProfile(res.data.profileUpdated);
                navigate('/myprofile');
            } else {
                alert('Error');
            }
        })
        .catch(err=>console.log(err));
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

    return (
        <div className="my-profile">
            <div className="my-profile-image-wrapper">
                <img src={loginInfo.myProfile.image} />
            </div>
            <h1 className="mb-0">{loginInfo.myProfile.name}</h1>
            <p className="mt-0 mb-4">{`@${loginInfo.username}`}</p>
            <p className="text-justify">{loginInfo.myProfile.aboutMe}</p>
            <button className="btn btn-secondary btn-lg w-100 mb-3" onClick={onDelete}>
                <i class="fa-solid fa-trash mr-3"></i>
                Delete My Profile
            </button>
            <div class="modal fade" id="modalContactForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">Edit Profile</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3">
                        <div className="form-group p-0 m-0">
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

                        <div class="md-form">
                            <i class="fas fa-user prefix grey-text"></i>
                            <input name="name" type="text" id="form34" class="form-control validate" value={name} onChange={onChanged}/>
                            <label data-error="wrong" data-success="right" for="form34">Your name</label>
                        </div>

                        <div class="md-form">
                            <i class="fas fa-pencil prefix grey-text"></i>
                            <textarea name="aboutMe" type="text" id="form8" class="md-textarea form-control" rows="4" value={aboutMe} onChange={onChanged}></textarea>
                            <label data-error="wrong" data-success="right" for="form8">About me</label>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button class="btn btn-secondary btn-lg w-100 mx-4" onClick={onUpdate} data-dismiss="modal" aria-label="Close">Edit <i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </div>
            </div>
            </div>

            <div class="text-center">
                <button class="btn btn-outline-secondary btn-lg w-100 mb-3" data-toggle="modal" data-target="#modalContactForm">
                    <i class="fa-solid fa-pen-to-square mr-3"></i>
                    Edit My Profile
                </button>
            </div>

            <div class="modal fade" id="changePreference" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">Change Preference</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3">
                        <div class="md-form">
                            <h4 className="text-left">Age</h4>
                            <div class="range">
                                <div class="range-slider">
                                    <span class="range-selected"></span>
                                </div>
                                <input type="range" className="w-100" name="min" min="18" max="70" value={loginInfo.minAge} onChange={changePreference} step="1"/>
                                <label for="min">Min</label>
                                <input className="ml-3" type="number" name="min" value={loginInfo.minAge} onChange={changePreference} style={{width: "10%"}}/>
                                <input type="range" className="w-100" name="max" min="18" max="70" value={loginInfo.maxAge} onChange={changePreference} step="1"/>
                                <label for="max">Max</label>
                                <input className="ml-3" type="number" name="max" value={loginInfo.maxAge} onChange={changePreference} style={{width: "10%"}}/>
                            </div> 
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button class="btn btn-secondary btn-lg w-100 mx-4" data-dismiss="modal" aria-label="Close">
                            <i class="fa-solid fa-sliders mr-3"></i>
                            Change Preference
                        </button>
                    </div>
                </div>
            </div>
            </div>

            <div class="text-center">
                <button class="btn btn-outline-secondary btn-lg w-100 mb-3"  data-toggle="modal" data-target="#changePreference">
                    <i class="fa-solid fa-sliders mr-3"></i>
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