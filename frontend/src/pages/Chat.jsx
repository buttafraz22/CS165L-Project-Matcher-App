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
    const [chatId, setChatId] = useState("");

    const loginInfo = useContext(loginContext);

    useEffect(() => {
        getProfiles();
        if (room !== null) {
            socket.emit("join_room", room);
        }
    }, [room, chatId]);

    useEffect(() => {
        if (userId !== "") {
            getRoom();
        }
    },[userId])

    async function getProfiles() {
        const userInfo = {userId : loginInfo.userId};
        const response = await axios.get('http://localhost:5000/api/matched-profiles?userId='+userInfo.userId);
        if (response.data.profiles) {
            const profiles = response.data.profiles;
            setUserProfiles(profiles);
            console.log("Profiles: ",profiles);
        } else {
            alert("Data is not available.");
        }
    }

    async function getRoom() {
        const response = await axios.get('http://localhost:5000/api/get-room?userId1='+loginInfo.userId+'&userId2='+userId);
        if (response.data.chat) {
            const chat = response.data.chat;
            setRoom(chat.chatRoom);
            setChatId(chat._id);
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
                                return <ChatCard key={profile._id} id={profile.userId} name={profile.name} image={profile.image} setUserId={setUserId} getRoom={getRoom} />
                            })
                        }
                    </div>
                </div>
                {
                    userId === "" && chatId ==="" ?
                    <div className="selected-chat">
                        <h1>Matcher App</h1>
                    </div>
                    :
                    <ChatInput name={loginInfo.username} chatId={chatId} socket={socket} room={room}/>
                }
            </div>
        </>
    )
}

export default Chat;