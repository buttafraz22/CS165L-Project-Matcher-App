import { useContext } from "react";
import loginContext from "../context/auth/loginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyProfile() {
    const loginInfo = useContext(loginContext);
    const navigate = useNavigate();

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

    return (
        <div className="my-profile">
            <div className="my-profile-image-wrapper">
                <img src={loginInfo.myProfile.image} />
            </div>
            <h1 className="mb-0">{loginInfo.myProfile.name}</h1>
            <p className="mt-0 mb-4">{`@${loginInfo.username}`}</p>
            <p className="text-justify">{loginInfo.myProfile.aboutMe}</p>
            <button className="btn btn-secondary btn-lg w-100 my-4" onClick={onDelete}>Delete My Profile</button>
        </div>
    )
}

export default MyProfile;