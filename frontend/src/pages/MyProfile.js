import { useContext } from "react";
import loginContext from "../context/auth/loginContext";

function MyProfile() {
    const loginInfo = useContext(loginContext);

    return (
        <div className="my-profile">
            <div className="my-profile-image-wrapper">
                <img src={loginInfo.myProfile.image} />
            </div>
            <h1 className="mb-0">{loginInfo.myProfile.name}</h1>
            <p className="mt-0 mb-4">{`@${loginInfo.username}`}</p>
            <p className="text-justify">{loginInfo.myProfile.aboutMe}</p>
            <button className="btn btn-secondary btn-lg w-100 m-2">Update My Profile</button>
            <button className="btn btn-outline-secondary btn-lg w-100 m-2">Delete My Profile</button>
        </div>
    )
}

export default MyProfile;