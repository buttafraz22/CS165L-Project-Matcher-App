import axios from "axios";
import { useEffect, useState } from "react";

function UserProfile(props) {

    const [message, setMessage] = useState(null);

    function onCheck() {
        const matchData = {userId1: props.userId1, userId2: props.userId2}
        axios.post('http://localhost:5000/api/matches', matchData)
        .then(res=>{
            if (res.data.message) {
                alert(res.data.message)
                updateProfileNum()
                setMessage(res.data.message);
            } else {
                alert('Error')
            }
        })
        .catch(err=>console.log(err));
    }

    function updateProfileNum() {
        props.setProfileNum(prevValue=>{
            if (prevValue < props.totalProfiles-1){
                return prevValue+1
            } else{
                return 0
            }
        });
    }

    return (
        <>
            <div className="user-profile">
                <div className="user-profile-wrapper">
                    <img src="/images/profile-picture.jpg" alt="user-profile" />
                </div>
                <h1>{props.name}</h1>
                <p>{props.aboutMe.length > 315 ? props.aboutMe.slice(0, 315) : props.aboutMe}...</p>
                {
                    message ? 
                    <>
                        <button onClick={updateProfileNum}><i className="fa-solid fa-xmark fa-2xl" style={{color: "grey"}}></i></button>
                        <button onClick={onCheck}><i className="fa-solid fa-heart fa-2xl" style={{color: "#ff2600"}}></i></button>
                    </>
                    : 
                    <button><i class="fa-solid fa-message"></i></button>
                }
            </div>
        </>
    )
}

export default UserProfile;