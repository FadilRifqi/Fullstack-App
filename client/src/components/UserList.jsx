import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [friends, setFriends] = useState([]);

  const getFriendList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/friends");
      setFriends(response.data);
    } catch (error) {
      if (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const getUserList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      if (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getUserList();
    getFriendList();
  }, []);

  const removeFriend = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/friends`, {
        data: {
          friend_uuid: uuid,
        },
      });
      getFriendList();
    } catch (error) {
      if (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const deleteUser = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/users/${uuid}`);
      getUserList();
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const addFriend = async (uuid) => {
    try {
      await axios.post(`http://localhost:5000/friends`, {
        friend_uuid: uuid,
      });
      getFriendList();
    } catch (error) {
      if (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3>User List</h3>
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th className="text-center">Username</th>
                <th colSpan={2} className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((data, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td className="text-center">{data.name}</td>
                    <td
                      colSpan={2}
                      className="d-flex justify-content-center flex-row hidden"
                    >
                      {data.uuid !== user.uuid ? (
                        friends.find(
                          (friend) => friend.friend_uuid === data.uuid
                        ) ? (
                          <Link>
                            <Button
                              variant="danger"
                              className="mx-2"
                              onClick={() => removeFriend(data.uuid)}
                            >
                              Remove Friend
                            </Button>
                          </Link>
                        ) : (
                          <Link>
                            <Button
                              variant="success"
                              className="mx-2"
                              onClick={() => addFriend(data.uuid)}
                            >
                              Add Friend
                            </Button>
                          </Link>
                        )
                      ) : (
                        <Link to="/profile">
                          <Button variant="warning" className="mx-2">
                            Profile
                          </Button>
                        </Link>
                      )}
                      {user.role === "Admin" && (
                        <Link>
                          <Button
                            variant="danger"
                            onClick={() => {
                              deleteUser(data.uuid);
                            }}
                          >
                            Delete
                          </Button>
                        </Link>
                      )}
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

export default UserList;
