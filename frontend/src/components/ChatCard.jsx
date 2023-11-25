const ChatCard = (props) => {
    const message = `You can now chat with ${props.name}`;

    return (
        <div className="chat-card">
            <div className="chat-card-img-wrapper mr-2">
                <img src="/images/profile-picture.jpg"/>
            </div>
            <div className="chat-message-info">
                <div className="chat-card-message-title">
                    <h5>{props.name}</h5>
                    <small>12:09PM</small>
                </div>
                <p className="mt-3">{message.length > 36 ? message.slice(0, 36)+"..." : message}</p>
            </div>
            <hr />
        </div>
    )
};
 
export default ChatCard;