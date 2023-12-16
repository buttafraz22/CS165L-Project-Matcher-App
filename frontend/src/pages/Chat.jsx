import ChatCard from "../components/ChatCard";
import { useContext, useEffect, useState } from "react";
import loginContext from "../context/auth/loginContext";
import axios from "axios";
import io from 'socket.io-client';
import ChatInput from "../components/ChatInput";
import messagesContext from "../context/user-messages/messagesContext";

const socket = io.connect("http://localhost:5000");

function Chat() {

    const [userProfiles, setUserProfiles] = useState([]);
    const [name, setName] = useState(null);
    const [userId, setUserId] = useState("");
    const [room, setRoom] = useState(null);
    const [chatId, setChatId] = useState("");
    const [search, setSearch] = useState("");

    const loginInfo = useContext(loginContext);
    const messageInfo = useContext(messagesContext);

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

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // Your search logic here (e.g., making an API request)
            getProfiles();
        }, 1500); // Adjust the delay (in milliseconds) based on your needs
    
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    async function getProfiles() {
        const userInfo = {userId : loginInfo.userId};
        const response = await axios.get(`http://localhost:5000/api/matched-profiles?userId=${userInfo.userId}&search=${search}`);
        if (!response.data.isFailed) {
            const profiles = response.data.profiles;
            setUserProfiles(profiles);
        } else {
            setUserProfiles([]);
        }
    }

    async function getRoom() {
        const response = await axios.get('http://localhost:5000/api/get-room?userId1='+loginInfo.userId+'&userId2='+userId);
        if (response.data.chat) {
            const chat = response.data.chat;
            setRoom(chat.chatRoom);
            setChatId(chat._id);
            messageInfo.updateChatId(chat._id);
        } else {
            alert("Data is not available.");
        }
    }

    function onSearch(e) {
        const value = e.target.value;
        setSearch(value);
    }

    return (
        <>
            <div className="chat-page">
                <div className="chat">
                    <input className="form-control my-5" type="input" placeholder="Search" value={search} onChange={onSearch} />
                    <hr/>
                    <div className="chat-scroller">
                        {
                            userProfiles.length > 0 ?
                            userProfiles.map((profile)=>{
                                return <ChatCard key={profile._id} id={profile.userId} name={profile.name} image={profile.image} setName={setName} setUserId={setUserId} getRoom={getRoom} />
                            })
                            :
                            <p className="text-center h4">There is no profile</p>
                        }
                    </div>
                </div>
                {
                    userId === "" && chatId ==="" ?
                    <div className="selected-chat">
                        <h1>Matcher App</h1>
                    </div>
                    :
                    <ChatInput name={name} chatId={chatId} socket={socket} room={room}/>
                }
            </div>
        </>
    )
}

export default Chat;