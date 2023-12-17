/*
  Chat Page

  This component represents the Chat page of the halal matchmaking mobile application.
  It enables users to search, view, and engage in chat conversations with matched profiles.

  Dependencies:
  - ChatCard: Component displaying matched profiles for chat.
  - ChatInput: Component for sending messages in the selected chat.

  External Libraries:
  - axios: Used for making HTTP requests.
  - io (socket.io-client): Library for real-time bidirectional event-based communication.

  Contexts:
  - loginContext: Manages user authentication information.
  - messagesContext: Manages user messages and chat-related information.
*/

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import io from 'socket.io-client';
import ChatCard from "../components/ChatCard";
import ChatInput from "../components/ChatInput";
import loginContext from "../context/auth/loginContext";
import messagesContext from "../context/user-messages/messagesContext";

const socket = io.connect("http://localhost:5000");

function Chat() {

    // State variables for managing chat functionality
    const [userProfiles, setUserProfiles] = useState([]);
    const [name, setName] = useState(null);
    const [userId, setUserId] = useState("");
    const [room, setRoom] = useState(null);
    const [chatId, setChatId] = useState("");
    const [search, setSearch] = useState("");

    // Contexts for accessing user authentication and message information
    const loginInfo = useContext(loginContext);
    const messageInfo = useContext(messagesContext);

    // Effect to fetch user profiles and join chat room upon component mount
    useEffect(() => {
        getProfiles();
        if (room !== null) {
            socket.emit("join_room", room);
        }
    }, [room, chatId]);

    // Effect to get chat room information upon selecting a user profile
    useEffect(() => {
        if (userId !== "") {
            getRoom();
        }
    }, [userId])

    // Effect to debounce search input and fetch profiles accordingly
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getProfiles();
        }, 1500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // Function to fetch matched user profiles based on search criteria
    async function getProfiles() {
        const userInfo = {userId : loginInfo.userId};
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/matched-profiles?userId=${userInfo.userId}&search=${search}`);
        if (!response.data.isFailed) {
            const profiles = response.data.profiles;
            setUserProfiles(profiles);
        } else {
            setUserProfiles([]);
        }
    }

    // Function to get or create a chat room between two users
    async function getRoom() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/get-room?userId1=${loginInfo.userId}&userId2=${userId}`);
        if (response.data.chat) {
            const chat = response.data.chat;
            setRoom(chat.chatRoom);
            setChatId(chat._id);
            messageInfo.updateChatId(chat._id);
        } else {
            alert("Data is not available.");
        }
    }

    // Function to handle search input changes
    function onSearch(e) {
        const value = e.target.value;
        setSearch(value);
    }

    // Rendered JSX for the Chat page
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
                    <ChatInput name={name} chatId={chatId} socket={socket} room={room} userId={userId}/>
                }
            </div>
        </>
    );
}

export default Chat;