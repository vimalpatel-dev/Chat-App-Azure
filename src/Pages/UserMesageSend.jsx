import React, { useEffect, useState } from "react";
import SelfChat from "../components/SelfChat";
import UserChat from "../components/UserChat";
import "../App.css";
import { useMyClientContext } from "../context/client";
import { Link } from "react-router-dom";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

function UserMesageSend() {
  let { userId } = useParams();
  const { client, setClient, user, setUser } = useMyClientContext();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (client) {
      client.on("server-message", (e) => {
        const data = e.message.data;
        appendMessage(data);
        console.log("Server-Message", data?.from);
      });
      //On Group Message
      client.on("group-message", (e) => {
        const data = e.message.data;
        appendMessage(data);
      });
    }
  }, []);
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

      await fetch(`http://localhost:8080/send-to-userId?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chat),
      });
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
        <Link to={"/"} className="send-button">
          Home Page
        </Link>
      </div>
    </div>
  );

  return <div>{!client ? <h1> Plase Login First </h1> : messagePage}</div>;
}

export default UserMesageSend;
