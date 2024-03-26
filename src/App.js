import "./App.css";
import React, { useState } from "react";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import UserChat from "./components/UserChat";
import SelfChat from "./components/SelfChat";
import { useMyClientContext } from "./context/client";
import { Link } from "react-router-dom";

const App = () => {
  const { client, setClient, user, setUser } = useMyClientContext();

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  // const [client, setClient] = useState(null);

  async function connect() {
    const client = new WebPubSubClient({
      getClientAccessUrl: async () =>
        (
          await fetch(
            `${process.env.REACT_APP_BASE_URL}get-access-token?user=${user}`
          )
        ).text(),
    });

    // On Connection Established
    client.on("connected", (e) => {
      console.log(`Connection ${e.connectionId} is connected.`);
    });

    // From Server Message
    client.on("server-message", (e) => {
      const data = e.message.data;
      appendMessage(data);
      console.log("Server-Message", data);
    });

    //On Group Message
    client.on("group-message", (e) => {
      const data = e.message.data;
      appendMessage(data);
    });
    await client.start();
    await client.joinGroup("chat"); // Joining Group
    setClient(client);
  }

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

  const loginPage = (
    <div className="login-container">
      <div className="login-form">
        <input
          autoFocus
          type="text"
          className="username-input"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <div className="login-button-container">
          <button
            className="login-button"
            type="button"
            disabled={!user}
            onClick={connect}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );

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

        <Link to={"/vimal123"} className="send-button">
          Go to Page
        </Link>
      </div>
    </div>
  );

  return <div className="CHAT-APP">{!client ? loginPage : messagePage}</div>;
};

export default App;
