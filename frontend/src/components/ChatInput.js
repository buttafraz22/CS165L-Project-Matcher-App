import { useContext, useEffect, useState } from "react";
import axios from "axios";
import loginContext from "../context/auth/loginContext";
import messagesContext from "../context/user-messages/messagesContext";

function ChatInput(props) {
    const [message, setMessage] = useState("");
    // const [messagesList, setMessagesList] = useState([]);
    const [enter, setEnter] = useState(true);
    const loginInfo = useContext(loginContext);
    const messagesList = useContext(messagesContext);

    async function sendMessage() {
        if (message !== "") {
            const messageData = {
                message: message,
                author: props.name,
                room: props.room,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await props.socket.emit("send_message", messageData, async (ackCallback) => {
                console.log("Call back: ",ackCallback);
                messagesList.updateMessages((prevValue) => [...prevValue, ackCallback]);
                // sendMessageToDataBase(ackCallback);
            });
            setMessage("");
        }
    }

    useEffect(()=>{
        // console.log("CHAT ID 897897897: ",props.chatId);
        // if (enter) {
        //     retrieveMessageToDataBase();
        //     setEnter(false);
        // }
        const handleReceiveMessage = async (data, ackCallback) => {
            console.log("Received message:", data);
            ackCallback();
            messagesList.updateMessages((prevValue) => [...prevValue, data]);
            // sendMessageToDataBase(data);
        };
        props.socket.on("receive_message", handleReceiveMessage);        
        return () => {
            props.socket.off("receive_message", handleReceiveMessage);
        };
    }, [props.socket])

    async function sendMessageToDataBase(message) {
        const messageData = {chatId: props.chatId, userId: loginInfo.userId, messageContent: message.message, time: message.time}
        const response = await axios.post('http://localhost:5000/api/messages', messageData);
        if (!response.data.isFailed) {
            const message = response.data.message;
            console.log(message);
        } else {
            alert("Data is not available.");
        }
    }

    async function retrieveMessageToDataBase() {
        console.log("Chat Id 0909: ", props.chatId);
        const response = await axios.get('http://localhost:5000/api/messages?chatId='+props.chatId);
        if (!response.data.isFailed) {
            const messages = response.data.messages;
            console.log(messages);
            for (let i = 0; i < messages.length; i++) {
                messagesList.messages.map((prevValue) => [...prevValue, {
                    message: messages[i].message.messageContent,
                    author: messages[i].name,
                    room: props.room,
                    time: messages[i].message.time
                }]);
            }
        } else {
            alert("Data is not available.");
        }
    }

    return (
        <div className="chat-input border-left">
            <div className="chat-input-header">
                <h2>Live Chat</h2>
            </div>
            <div className="chat-input-body">
                {
                    messagesList.messages.map((messageContent)=>{
                        return (
                            <div>
                                <div className="message my-2" id = {props.name === messageContent.author ? "you" : "other"}>
                                    <div 
                                        className="message-content px-4 rounded-right"
                                        
                                    >
                                        <p className="py-2">{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="chat-input-footer">
                <div class="input-group">
                    <input type="text" class="form-control p-4" placeholder="Type message..." aria-label="Recipient's username" aria-describedby="basic-addon2" value={message} onChange={(e)=>{setMessage(e.target.value)}} />
                    <div class="input-group-append">
                        <button class="btn btn-secondary btn-lg" onClick={sendMessage} type="button"><i class="fa-solid fa-share"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInput;