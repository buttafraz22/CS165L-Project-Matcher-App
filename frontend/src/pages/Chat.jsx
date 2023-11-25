import Navbar from "../components/Navbar";
import ChatCard from "../components/ChatCard";
import { useContext, useEffect, useState } from "react";
import loginContext from "../context/auth/loginContext";
import axios from "axios";

function Chat() {
    const [userProfiles, setUserProfiles] = useState([]);

    const loginInfo = useContext(loginContext);

    useEffect(()=>{
        console.log(loginInfo);
        getProfiles();
    },[])

    async function getProfiles() {
        const userInfo = {userId : loginInfo.userId};

        const response = await axios.get('http://localhost:5000/api/matched-profiles?userId='+userInfo.userId);
        if (response.data.profiles) {
            const profiles = response.data.profiles;
            setUserProfiles(profiles);
        } else {
            alert("Data is not available.");
        }
    }

    return (
        <>
            <div className="chat-page">
                <div className="chat">
                    <input className="form-control my-5" type="input" placeholder="Search" />
                    <hr/>
                    <div className="chat-scroller">
                        {
                            userProfiles.map((profile)=>{
                                return <ChatCard name={profile.name} />
                            })
                        }
                    </div>
                </div>
                <div className="selected-chat">
                    <h1>Matcher App</h1>
                </div>
            </div>
        </>
    )
}

export default Chat;