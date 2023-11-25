const ChatCard = () => {
    return (
        <div className="chat-card">
            <div className="chat-card-img-wrapper">
                <img src="/images/profile-picture.jpg"/>
            </div>
            <div className="chat-message-info">
                <div className="chat-card-message-title">
                    <h5>Title</h5>
                    <small>12:09PM</small>
                </div>
                <p>Hey! how you doing?</p>
                <hr />
            </div>
        </div>
    )
};
 
export default ChatCard;