import { GoogleGenAI } from "@google/genai";
import "./Chat.css";
import { useState } from "react";

function Chat({ file }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function handleSendMessage() {
    if (input.length > 0) {
      // Add user message and loading indicator
      const chatMessages = [
        ...messages,
        { role: "user", text: input },
        { role: "loader", text: "" },
      ];
      setInput("");
      setMessages(chatMessages);

      try {
        const ai = new GoogleGenAI({
          apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        });

        const result = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            {
              text: `Answer this question about the attached document: ${input}.
              Answer as a chatbot with short message and text only (no markdowns, tags or symbols)
              Chat history: ${JSON.stringify(
                messages.filter((message) => message.role !== "loader")
              )}`,
            },
            {
              inlineData: {
                mimeType: file.type,
                data: file.file.includes("base64,")
                  ? file.file.split("base64,")[1]
                  : file.file,
              },
            },
          ],
        });

        const responseText =
          result.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response received";

        // Remove loader and add response
        setMessages((prev) => [
          ...prev.filter((msg) => msg.role !== "loader"),
          { role: "model", text: responseText },
        ]);
      } catch (error) {
        console.error("Error:", error);
        // Remove loader and show error
        setMessages((prev) => [
          ...prev.filter((msg) => msg.role !== "loader"),
          { role: "model", text: "Error processing your request" },
        ]);
      }
    }
  }

  return (
    <section className="chat-window">
      <h2>Chat</h2>
      {messages.length > 0 ? (
        <div className="chat">
          {messages.map((message, index) => (
            <div className={`message ${message.role}`} key={index}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
          placeholder="Ask any question about the uploaded document..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </section>
  );
}

export default Chat;
