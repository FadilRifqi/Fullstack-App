import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {BiSend} from 'react-icons/bi'
import { Link } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState("");
  const sendMessages = async () => {};
  return (
    <div className="contaier row d-flex justify-content-center">
      <div className="col-md-8 inbox-box shadow bg-white px-5">
        <h3 className="text-center mt-4"></h3>
        <div className="row d-flex justify-content-center"></div>
        <div className="row chat-box"></div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 text-center d-flex flex-row gap-1">
            <Form.Control
              as="textarea"
              rows={1}
              onChange={(e) => {
                setMessages(e.target.value);
              }}
            ></Form.Control>
            <BiSend className="button-send" onClick={sendMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
