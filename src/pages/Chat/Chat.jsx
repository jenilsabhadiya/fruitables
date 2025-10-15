import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const socket = useMemo(() => io("http://localhost:4000"), []);

  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [megList, setMegList] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("client connect", socket.id);
    });

    socket.on("welcome", (message) => {
      console.log(message);
    });

    socket.on("receive_message", (message) => {
      console.log(message);

      setMegList((prev) => [...prev, message]);
    });
  }, []);

  const handleSubmit = () => {
    event.preventDefault();
    console.log("kkk");

    socket.emit("send_message", { to, message });
  };

  return (
    <div>
      <h1>Chat</h1>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <form action="" onSubmit={() => handleSubmit()}>
        <input
          type="text"
          name="to"
          placeholder="Enter id "
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          name="massage"
          placeholder="Enter your massage."
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" />
      </form>

      {megList.map((v, i) => (
        <p key={i}>{v}</p>
      ))}
    </div>
  );
}

export default Chat;
