import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const FriendList = () => {
  const [myFriends, setMyFriends] = useState([]);
  const [msg, setMsg] = useState("");

  const getMyFriends = async () => {
    try {
      const response = await axios.get("http://localhost:5000/friends");
      setMyFriends(response.data);
    } catch (error) {
      if (error) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getMyFriends();
  }, []);

  const removeFriend = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/friends`, {
        data: {
          friend_uuid: uuid,
        },
      });
      getMyFriends();
    } catch (error) {
      if (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container">
      <div className="row grid-scroll-my">
        <div className="col-md-12 mb-4">
        <h3>My Friends</h3>
        <h4>{msg}</h4>
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th colSpan={2} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {myFriends &&
                myFriends.map((myFriend, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{myFriend.friend_name}</td>
                      <td colSpan={2} className="d-flex justify-content-center flex-row">
                        <Link>
                          <Button variant="danger" onClick={()=>{removeFriend(myFriend.friend_uuid)}}>Remove Friend</Button>
                        </Link>
                        <td>
                          <Link to={`/inbox/chat/${myFriend.friend_uuid}`}>
                            <Button className="btn-fill px-4">Kirim Pesan</Button>
                          </Link>
                        </td>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
