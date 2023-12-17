/*
  MessagesState

  This module defines a React context provider for managing user messages.
  It uses the MessagesContext created in the messagesContext module and provides it for use in other components.
  It also includes functionality to update and retrieve messages from the server.

  Dependencies:
  - React: Core library for building UI components.
  - axios: Promise-based HTTP client for making requests to the server.
*/

// Importing useEffect and useState from React, MessagesContext, and axios
import { useEffect, useState } from "react";
import MessagesContext from "./messagesContext";
import axios from "axios";

// Functional component MessagesState
function MessagesState(props) {
  // State variables for messages and chatId
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  // Function to update messages state
  function updateMessages(messagesList) {
    setMessages(messagesList);
  }

  // Effect to retrieve messages when chatId changes
  useEffect(() => {
    if (chatId !== null) {
      retrieveMessageFromDataBase();
    }
  }, [chatId]);

  // Function to update chatId state
  function updateChatId(id) {
    setChatId(id);
  }

  // Function to retrieve messages from the server
  async function retrieveMessageFromDataBase() {
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
        });
      }
      updateMessages(displayMessage);
    } else {
      alert("Data is not available.");
    }
  }

  // Providing MessagesContext for use in other components
  return (
    <>
      <MessagesContext.Provider value={{ messages, chatId, updateMessages, updateChatId }}>
        {props.children}
      </MessagesContext.Provider>
    </>
  );
}

// Exporting the MessagesState component
export default MessagesState;