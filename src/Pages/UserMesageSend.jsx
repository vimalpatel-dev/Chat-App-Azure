import React, { useState } from "react";
import SelfChat from "../components/SelfChat";
import UserChat from "../components/UserChat";

function UserMesageSend({client}) {

	const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

	async function send() {
    try {
      const chat = {
        from: user,
        message: message,
      };
      setMessage("");
      await client.sendToGroup("chat", chat, "json", { noEcho: true });

      //Send request To Server for Sending Broadcast message
      // await fetch("http://localhost:8080/send-to-all");
      await fetch("http://localhost:8080/test");

      appendMessage(chat);
    } catch (err) {
      console.log("error", err);
    }
  }

	function appendMessage(data) {
    setChats((prev) => [...prev, data]);
  }

	const messagePage = (
    <div className="message-page">
      <div className="chat-messages">
        {chats.map((item, index) =>
          item.from === user ? (
            <SelfChat key={index} message={item.message} />
          ) : (
            <UserChat key={index} from={item.from} message={item.message} />
          )
        )}
      </div>
      <div className="message-input">
        <input
          type="text"
          className="message-input-field"
          placeholder={`Hi ${user}, type a message`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="send-button"
          type="button"
          disabled={!message}
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );



	return (
		<div>
			{messagePage}
		</div>
	)
}

export default UserMesageSend