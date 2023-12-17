/*
  ChatInput Component

  This component represents the input area for sending and receiving messages in a chat.
  It includes the message input field, the list of messages, and options for reporting a profile.

  Dependencies:
  - React: Core library for building UI components.
  - axios: HTTP client for making requests to the server.
  - loginContext: Context for managing user login information.
  - messagesContext: Context for managing user messages.
  - Form: Bootstrap form component for styling.
*/

import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import loginContext from "../context/auth/loginContext";
import messagesContext from "../context/user-messages/messagesContext";
import Form from 'react-bootstrap/Form';

function ChatInput(props) {
    // State for managing the message input
    const [message, setMessage] = useState('');

    // State for managing the reporting functionality
    const [reportType, setReportType] = useState('default');
    const [reportContent, setReportContent] = useState('');

    // Accessing login information from context
    const loginInfo = useContext(loginContext);

    // Accessing messages list from context
    const messagesList = useContext(messagesContext);

    // Ref for scrolling to the bottom of the messages container
    const scrollableDivRef = useRef(null);

    // Scroll to the bottom of the messages container when messages are updated
    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [messagesList.messages]);

    // Unique identifier for the current chat
    const chatId = props.chatId;

    // Function to send a message
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
        
                messagesList.updateMessages((prevValue) => [...prevValue, ackCallback]);
                await sendMessageToDataBase(ackCallback);
        
                setMessage("");
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function sendMessageToDataBase(message) {
        const messageData = {
            chatId: props.chatId,
            userId: loginInfo.userId,
            messageContent: message.message,
            time: message.time,
        };
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/messages`, messageData);
        
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

    // Event listener for pressing Enter to send a message
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    // Event listener for selecting report options
    function onSelected(e) {
        const value = e.target.value;
        const name = e.target.name;
        if (name === 'reportType') {
            setReportType(value);
        } else {
            setReportContent(value);
        }
    }

    // Function to submit a report
    async function submitReport() {
        if (reportType !== 'default' && reportContent !== '') {
            let data = {
                reporterUser: loginInfo.myProfile.userId,
                reportedUser: props.userId,
                reportType,
                reportContent
            };
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/reports`, data);
            
                if (!response.data.isFailed) {
                    alert(response.data.message);
                } else {
                    alert("Report is not submitted.");
                }
            } catch (error) {
                console.error(error);
            }
            setReportType('default');
            setReportContent('');
        } else {
            alert("Please provide complete information.");
        }
    }

    // Styling for the container
    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    // Rendered JSX for ChatInput component
    return (
        <div className="chat-input border-left">
            <div className="chat-input-header">
                <div style={containerStyle}>
                    <h2>{props.name}</h2>
                    {/* Modal for reporting a profile */}
                    <div className="modal fade" id="modalContactForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header text-center">
                                    <h4 className="modal-title w-100 font-weight-bold">Report Profile</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body mx-3">
                                    {/* Form for reporting */}
                                    <Form.Select name="reportType" className='w-100 border p-2 mb-3 rounded' aria-label="Default select example" onChange={onSelected} value={reportType}>
                                        <option value="default">Report Type</option>
                                        <option value="profileViolation">Profile Violation</option>
                                        <option value="harassment">Harassment or Offensive Behavior</option>
                                        <option value="impersonation">Impersonation</option>
                                        <option value="scamFraud">Scam or Fraud</option>
                                        <option value="inappropriateContent">Inappropriate Content</option>
                                        <option value="technicalIssue">Technical Issue</option>
                                    </Form.Select>
                                    <div className="md-form text-center">
                                        <i className="fas fa-pencil prefix grey-text"></i>
                                        <textarea name="reportContent" type="text" id="form8" className="md-textarea form-control" rows="4" onChange={onSelected} value={reportContent}></textarea>
                                        <label data-error="wrong" data-success="right" htmlFor="form8">Description</label>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button className="btn btn-secondary btn-lg w-100 mx-4" data-dismiss="modal" aria-label="Close" onClick={submitReport}><i className="fa-solid fa-flag"></i> Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Button to open the report modal */}
                    <div className="text-center m-0">
                        <button className="btn" data-toggle="modal" data-target="#modalContactForm">
                            <i className="fa-solid fa-flag fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
            {/* Container for displaying messages */}
            <div className="chat-input-body" ref={scrollableDivRef}>
                {
                    messagesList.messages.map((messageContent, value) => {
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
            {/* Message input and send button */}
            <div className="chat-input-footer">
                <div className="input-group">
                    <input type="text" className="form-control p-4" placeholder={`Send message to ${props.name}...`} onKeyDown={handleKeyDown} aria-label="Recipient's username" aria-describedby="basic-addon2" value={message} onChange={(e) => { setMessage(e.target.value) }} />
                    <div className="input-group-append">
                        <button className="btn btn-secondary btn-lg" onClick={sendMessage} type="button"><i className="fa-solid fa-share"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatInput;