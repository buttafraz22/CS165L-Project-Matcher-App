import Navbar from "../components/Navbar";
import ChatCard from "../components/ChatCard";

function Chat() {
    return (
        <>
            <div className="chat-page">
                <div className="chat border-right">
                    <input className="form-control my-5" type="input" placeholder="Search" />
                    <div className="chat-scroller">
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                    </div>
                </div>
                <div className="selected-chat">
                    <h1>Matcher App</h1>
                </div>
            </div>
        </>
    )
}

export default Chat;