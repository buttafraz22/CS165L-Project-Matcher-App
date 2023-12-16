import { useEffect, useState } from "react";
import MessagesContext from "./messagesContext";
import axios from "axios";

function MessagesState(props) {
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);

    function updateMessages(messagesList) {
        setMessages(messagesList);
    }

    useEffect(() => {
        if (chatId !== null) {
          retrieveMessageToDataBase();
        }
      }, [chatId]);

    function updateChatId(id) {
        setChatId(id);
    }

    async function retrieveMessageToDataBase() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/messages?chatId=${chatId}`);
        if (!response.data.isFailed) {
            const messages = response.data.messages;
            let displayMessage = [];
            for (let i = 0; i < messages.length; i++) {
                displayMessage.push({
                    message: messages[i].message.messageContent,
                    author: messages[i].name,
                    room: props.room,
                    time: messages[i].message.time
                })
            }
            updateMessages(displayMessage);
        } else {
            alert("Data is not available.");
        }
    }

    return (
        <>
            <MessagesContext.Provider value={{messages, chatId, updateMessages, updateChatId}}>
                {props.children}
            </MessagesContext.Provider>
        </>
    )
}

export default MessagesState;