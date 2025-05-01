import "./Chat.css";

function Chat() {
  return (
    <section className="chat-window">
      <h2>Chat</h2>
      <div className="chat">
        <div className="user">
          <p>When was this photo taken?</p>
        </div>
        <div className="model">
          <p>This photo was taken in October 2025.</p>
        </div>
        <div className="error">
          <p>Error sending your message. Please try again</p>
        </div>
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Ask any question about the uploaded document..."
        />
        <button>Send</button>
      </div>
    </section>
  );
}

export default Chat;
