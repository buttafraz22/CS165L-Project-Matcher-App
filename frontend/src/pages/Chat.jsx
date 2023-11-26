import Navbar from "../components/Navbar";
import ChatCard from "../components/ChatCard";
import { useContext, useEffect, useState } from "react";
import loginContext from "../context/auth/loginContext";
import axios from "axios";
import io from 'socket.io-client';
import ChatInput from "../components/ChatInput";

const socket = io.connect("http://localhost:5000");

function Chat() {

    const [userProfiles, setUserProfiles] = useState([]);
    const [userId, setUserId] = useState("");
    const [room, setRoom] = useState(null);

    const loginInfo = useContext(loginContext);

    useEffect(()=>{
        getProfiles();
        if (userId !== "") {
            getRoom();
        }
        if (room !== null) {
            socket.emit("join_room", room);
        }
        console.log("I am here");
        console.log("Room: ", room);
    },[userId, room])

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

    async function getRoom() {
        const response = await axios.get('http://localhost:5000/api/get-room?userId1='+loginInfo.userId+'&userId2='+userId);
        if (response.data.chat) {
            const chat = response.data.chat;
            console.log(chat);
            setRoom(chat.chatRoom);
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
                                return <ChatCard key={profile._id} id={profile.userId} name={profile.name} onClicked={setUserId} getRoom={getRoom} />
                            })
                        }
                    </div>
                </div>
                {
                    userId === "" ?
                    <div className="selected-chat">
                        <h1>Matcher App</h1>
                    </div>
                    :
                    <ChatInput name={loginInfo.username} socket={socket} room={room}/>
                }
            </div>
        </>
    )
}

export default Chat;