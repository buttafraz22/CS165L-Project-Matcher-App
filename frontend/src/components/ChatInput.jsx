import { useContext, useEffect, useState , useRef } from "react";
import axios from "axios";
import loginContext from "../context/auth/loginContext";
import messagesContext from "../context/user-messages/messagesContext";

function ChatInput(props) {
    const [message, setMessage] = useState("");
    const loginInfo = useContext(loginContext);
    const messagesList = useContext(messagesContext);

    const scrollableDivRef = useRef(null);

    useEffect(() => {
        if (scrollableDivRef.current) {
        scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [messagesList.messages]);

    const chatId = props.chatId;

    async function sendMessage() {
        if (message !== "") {
            const messageData = {
                message: message,
                author: loginInfo.myProfile.name,
                room: props.room,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
        
            try {
                const ackCallback = await new Promise((resolve) => {
                    props.socket.emit("send_message", messageData, (ackCallback) => {
                        resolve(ackCallback);
                    });
                });
        
                console.log("Call back: ", ackCallback);
        
                messagesList.updateMessages((prevValue) => [...prevValue, ackCallback]);
                await sendMessageToDataBase(ackCallback);
        
                setMessage("");
            } catch (error) {
                console.error(error);
            }
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
        const messageData = {
            chatId: props.chatId,
            userId: loginInfo.userId,
            messageContent: message.message,
            time: message.time,
        };
        
        try {
            const response = await axios.post('http://localhost:5000/api/messages', messageData);
        
            if (!response.data.isFailed) {
                const receivedMessage = response.data.message;
                console.log(receivedMessage);
            } else {
                alert("Data is not available.");
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    return (
        <div className="chat-input border-left">
            <div className="chat-input-header">
                <h2>{props.name}</h2>
            </div>
            <div className="chat-input-body" ref={scrollableDivRef}>
                {
                    messagesList.messages.map((messageContent, value)=>{
                        return (
                            <div key={value} className={`chat-message-group ${props.name !== messageContent.author && "writer-user"} `}>
                                <div className="chat-messages">
                                    <div className="message">{messageContent.message}</div>
                                    <div className="from">{messageContent.author} {messageContent.time}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="chat-input-footer">
                <div className="input-group">
                    <input type="text" className="form-control p-4" placeholder={`Send message to ${props.name}...`} aria-label="Recipient's username" aria-describedby="basic-addon2" value={message} onChange={(e)=>{setMessage(e.target.value)}} />
                    <div className="input-group-append">
                        <button className="btn btn-secondary btn-lg" onClick={sendMessage} type="button"><i className="fa-solid fa-share"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInput;