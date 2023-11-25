import { useEffect, useState } from "react";

function ChatInput(props) {
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);

    async function sendMessage() {
        if (message !== "") {
            const messageData = {
                message: message,
                author: props.name,
                room: props.room,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await props.socket.emit("send_message", messageData)
            setMessagesList((prevValue)=>[...prevValue, messageData]);
            setMessage("");
        }
    }

    useEffect(()=>{
        props.socket.on("receive_message", (data)=>{
            setMessagesList((prevValue)=>[...prevValue, data]);
        })
    }, [props.socket])

    return (
        <div className="chat-input border-left">
            <div className="chat-input-header">
                <h2><i class="fa-solid fa-message-heart fa-2xl"></i> Live Chat</h2>
            </div>
            <div className="chat-input-body">
                {
                    messagesList.map((messageContent)=>{
                        return (
                            <div>
                                <div className="message my-2">
                                    <div 
                                        className="message-content px-4 rounded-right"
                                        id = {props.name === messageContent.author ? "you" : "other"}
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