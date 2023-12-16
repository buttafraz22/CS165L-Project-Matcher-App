import { useContext, useEffect, useState } from "react";
import axios from "axios";
import loginContext from "../context/auth/loginContext";
import messagesContext from "../context/user-messages/messagesContext";

function ChatInput(props) {
    const [message, setMessage] = useState("");
    const loginInfo = useContext(loginContext);
    const messagesList = useContext(messagesContext);

    const chatId = props.chatId;

    async function sendMessage() {
        if (message !== "") {
            const messageData = {
                message: message,
                author: loginInfo.myProfile.name,
                room: props.room,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await props.socket.emit("send_message", messageData, async (ackCallback) => {
                console.log("Call back: ",ackCallback);
                messagesList.updateMessages((prevValue) => [...prevValue, ackCallback]);
                sendMessageToDataBase(ackCallback);
            });
            setMessage("");
        }
    }

    useEffect(()=>{
        const handleReceiveMessage = async (data, ackCallback) => {
            console.log("Received message:", data);
            ackCallback();
            messagesList.updateMessages((prevValue) => [...prevValue, data]);
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

    return (
        <div className="chat-input border-left">
            <div className="chat-input-header">
                <h2>Live Chat</h2>
            </div>
            <div className="chat-input-body">
                {
                    messagesList.messages.map((messageContent)=>{
                        return (
                            <>
                                <div class={`chat-message-group ${props.name !== messageContent.author && "writer-user"} `}>
                                    <div class="chat-messages">
                                        <div class="message">{messageContent.message}</div>
                                        <div class="from">{messageContent.author} {messageContent.time}</div>
                                    </div>
                                </div>
                            </>
                        );
                    })
                }
            </div>
            <div className="chat-input-footer">
                <div class="input-group">
                    <input type="text" class="form-control p-4" placeholder={`Send message to ${props.name}...`} aria-label="Recipient's username" aria-describedby="basic-addon2" value={message} onChange={(e)=>{setMessage(e.target.value)}} />
                    <div class="input-group-append">
                        <button class="btn btn-secondary btn-lg" onClick={sendMessage} type="button"><i class="fa-solid fa-share"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInput;