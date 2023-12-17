/*
  ChatCard Component

  This component represents a card displaying information about a user with whom the current user can chat.
  It includes the user's name, profile image, and a brief chat message.

  Dependencies:
  - React: Core library for building UI components.
  - messagesContext: Context for managing user messages.
  - axios: HTTP client for making requests to the server.
*/

import { useContext } from "react";
import messagesContext from "../context/user-messages/messagesContext";
import axios from "axios";

const ChatCard = (props) => {
    // Constructing the chat message
    const message = `You can now chat with ${props.name}`;

    // Accessing the messages context
    const messagesList = useContext(messagesContext);

    // Function to save user ID and name when clicked
    async function saveUserId() {
        props.setUserId(props.id);
        props.setName(props.name);
    }

    // Rendered JSX for ChatCard component
    return (
        <div className="chat-card" onClick={saveUserId}>
            {/* User Profile Image */}
            <div className="chat-card-img-wrapper mr-2">
                <img src={props.image} alt={`Profile of ${props.name}`} />
            </div>

            {/* User Information and Chat Message */}
            <div className="chat-message-info">
                {/* User Name */}
                <div className="chat-card-message-title">
                    <h5>{props.name}</h5>
                </div>

                {/* Brief Chat Message */}
                <p className="mt-3">
                    {message.length > 36 ? message.slice(0, 36) + "..." : message}
                </p>
            </div>

            {/* Horizontal Line */}
            <hr />
        </div>
    );
};

export default ChatCard;