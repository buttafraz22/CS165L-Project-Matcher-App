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
        }
    }

    useEffect(()=>{
        props.socket.on("receive_message", (data)=>{
            setMessagesList((prevValue)=>[...prevValue, data]);
        })
    }, [props.socket])

    return (
        <div>
            <div className="chat-input-header">
                <h2>{props.name}</h2>
            </div>
            <div className="chat-input-body">
                {
                    messagesList.map((messageContent)=>{
                        return <h5>{messageContent.message}</h5>
                    })
                }
            </div>
            <div className="chat-input-footer">
                <input type="text" className="" onChange={(e)=>setMessage(e.target.value)}/>
                <button onClick={sendMessage}><i class="fa-solid fa-share"></i></button>
            </div>
        </div>
    )
}

export default ChatInput;