import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile(props) {
    const [isMatched, setMatched] = useState(false);
    const navigate = useNavigate();

    const matchData = {userId1: props.userId1, userId2: props.userId2}

    function onCheck() {
        if (isMatched) {
            axios.post('http://localhost:5000/api/un-match', matchData)
            .then(res=>{
                if (res.data.message) {
                    setMatched(false);
                }
            })
            .catch(err=>console.log(err));
        } else {
            axios.post('http://localhost:5000/api/matches', matchData)
            .then(res=>{
                if (res.data.message) {
                    setMatched(true);
                }
            })
            .catch(err=>console.log(err));
        }
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

    useEffect(()=>{
        axios.post('http://localhost:5000/api/is-matched', matchData)
        .then(res=>{
            if (res.data.message) {
                setMatched(true);
            }
        })
        .catch(err=>console.log(err));
    }, [])

    return (
        <>
            <div className="user-profile">
                <div className="user-profile-wrapper">
                    <img src={`${props.image}`} alt="user-profile" />
                </div>
                <h1>{props.name}</h1>
                <p>{props.aboutMe.length > 315 ? props.aboutMe.slice(0, 350)+"..." : props.aboutMe}</p>
                <button onClick={updateProfileNum}><i className="fa-solid fa-xmark fa-2xl" style={{color: "grey"}}></i></button>
                <button onClick={onCheck}><i className={isMatched ? "fa-solid fa-heart fa-2xl" : "fa-regular fa-heart fa-2xl"} style={{color: "#ff2600"}}></i></button>
                {
                    isMatched &&
                    <button><i className="fa-solid fa-message fa-2xl" style={{color: "grey"}} onClick={()=>navigate("/chat")}></i></button>
                }
            </div>
        </>
    )
}

export default UserProfile;