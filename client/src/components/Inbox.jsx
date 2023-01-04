import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { BsPlusSquare } from "react-icons/bs";
import { Form } from "react-bootstrap";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [value ,setValue]= useState('')
  const [uuid, setUuid] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getMyFriends();
  };

  const getMessages = async () => {
    const response = await axios.get("http://localhost:5000/messages");
    setMessages(response.data);
    console.log(response.data);
  };

  const getMyFriends = async () => {
    try {
      const response = await axios.get("http://localhost:5000/friends");
      setMyFriends(response.data);
      console.log(response.data);
      const data = await response.data
      if(!data) return setValue("")
      setValue(data[0].friend_uuid)
      console.log(response.data);
    } catch (error) {
      if (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const createMessage = async()=>{
    let params;
    if(!uuid){
        params = value
    }else{
        params = uuid
    }
    try {
        await axios.post(`http://localhost:5000/messages`,{
            receiver_uuid:params,
            text:msg,
        });
        setShow(false)
    } catch (error) {
        if(error){
            console.log(error.response.data.msg)
        }
    }
  }

  const deleteMessage = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/messages/${uuid}`);
      getMessages();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getMessages();
    getMyFriends()
  }, []);

  return (
    <div className="contaier row d-flex justify-content-center">
      <div className="col-md-8 inbox-box shadow bg-white px-5">
        <h3 className="text-center mt-4">In Box</h3>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-center">
            Kirim Pesan <BsPlusSquare className="button" onClick={handleShow} />
          </div>
        </div>
        <div className="row">
          {messages &&
            messages.map((data, i) => {
              return (
                <div className="relative">
                  <Link
                    to={`/inbox/chat/${data.sender_uuid}`}
                    className="text-default"
                  >
                    <div
                      className="col-md-12 border my-2 messages d-flex flex-row"
                      key={i}
                    >
                      <div className="mx-2 name-box">
                        <img src="/images/logo.png" alt="" /> From:{" "}
                        {data.sender_name}
                      </div>
                      <div className="mx-10 message-box">
                        Message: {data.text}
                      </div>
                    </div>
                  </Link>
                  <div className="mt-1 mx-3 btn-hover absolute-btn">
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteMessage(data.sender_uuid);
                      }}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Kirim Pesan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row d-flex-justify-content-center flex-row">
              <div className="col-md-8">
                <Form.Group>
                  <Form.Label>
                    <Form.Text muted>Pesan</Form.Text>
                  </Form.Label>
                  <Form.Control as="textarea" rows={5} onChange={(e)=>{setMsg(e.target.value)}}/>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label>
                    <Form.Text muted>{"Penerima (Daftar Teman)"}</Form.Text>
                  </Form.Label>
                  <Form.Select onChange={(e)=>{setUuid(e.target.value)}} defaultValue={value}>
                    {myFriends &&
                      myFriends.map((friend, i) => {
                        return <option key={i} value={friend.friend_uuid}>{friend.friend_name}</option>;
                      })}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="success" onClick={createMessage}>Kirim</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inbox;
