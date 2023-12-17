import { useContext, useEffect, useState , useRef } from "react";
import axios from "axios";
import loginContext from "../context/auth/loginContext";
import messagesContext from "../context/user-messages/messagesContext";
import Form from 'react-bootstrap/Form';

function ChatInput(props) {
    const [message, setMessage] = useState('');
    const [reportType, setReportType] = useState('default');
    const [reportContent, setReportContent] = useState('');

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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    function onSelected(e) {
        const value = e.target.value;
        const name = e.target.name;
        if (name === 'reportType'){
            setReportType(value);
        } else {
            setReportContent(value);
        }
    }

    async function submitReport() {
        if (reportType !== 'default' && reportContent !== '') {
            let data = {
                reporterUser: loginInfo.myProfile.userId,
                reportedUser: props.userId,
                reportType,
                reportContent
            }
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/reports`, data);
            
                if (!response.data.isFailed) {
                    const receivedMessage = response.data.message;
                    console.log(receivedMessage);
                    alert(receivedMessage);
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

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    return (
        <div className="chat-input border-left">
            <div className="chat-input-header">
                <div style={containerStyle}>
                    <h2>{props.name}</h2>
                    <div className="modal fade" id="modalContactForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Report Profile</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                {/* <div className="form-group p-0 m-0">
                                    <label htmlFor="profile-upload">
                                        <img src={visualizePicture} alt="select-img" className="custom-picture" />
                                    </label>
                                    <input 
                                        type="file"
                                        name="profilePicture"
                                        label="Image"
                                        id="profile-upload"
                                        className="form-control custom-picture-upload"
                                        accept=".jpeg, .png, jpg"
                                        onChange={handleFileUpload}
                                    />
                                </div>

                                <div className="md-form">
                                    <i className="fas fa-user prefix grey-text"></i>
                                    <input name="name" type="text" id="form34" className="form-control validate" value={name} onChange={onChanged}/>
                                    <label data-error="wrong" data-success="right" htmlFor="form34">Your name</label>
                                </div>

                                <div className="md-form">
                                    <i className="fas fa-pencil prefix grey-text"></i>
                                    <textarea name="aboutMe" type="text" id="form8" className="md-textarea form-control" rows="4" value={aboutMe} onChange={onChanged}></textarea>
                                    <label data-error="wrong" data-success="right" htmlFor="form8">About me</label>
                                </div> */}
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

                    <div className="text-center m-0">
                        <button className="btn" data-toggle="modal" data-target="#modalContactForm">
                            <i className="fa-solid fa-flag fa-2x"></i>
                        </button>
                    </div>
                </div>
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
                    <input type="text" className="form-control p-4" placeholder={`Send message to ${props.name}...`} onKeyDown={handleKeyDown} aria-label="Recipient's username" aria-describedby="basic-addon2" value={message} onChange={(e)=>{setMessage(e.target.value)}} />
                    <div className="input-group-append">
                        <button className="btn btn-secondary btn-lg" onClick={sendMessage} type="button"><i className="fa-solid fa-share"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInput;