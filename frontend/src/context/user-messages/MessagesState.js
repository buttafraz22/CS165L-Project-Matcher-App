import { useState } from "react";
import MessagesContext from "./messagesContext";

function MessagesState(props) {
    const [messages, setMessages] = useState([]);

    function updateMessages(messagesList) {
        setMessages(messagesList);
    }

    return (
        <>
            <MessagesContext.Provider value={{messages, updateMessages}}>
                {props.children}
            </MessagesContext.Provider>
        </>
    )
}

export default MessagesState;