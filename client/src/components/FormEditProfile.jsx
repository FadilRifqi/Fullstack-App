import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProfile = () => {
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [users, setUsers] = useState();
  const [preview, setPreview] = useState();
  const navigate = useNavigate();
  const {id} = useParams()

  const getUserById = async (uuid) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${uuid}`);
      const data = await response.data;
      setUsers(data);
      setName(data.name);
      setPreview(data.url)
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",file)
    formData.append("name",name)
    try {
      await axios.patch(`http://localhost:5000/users/${id}`,formData,{
        headers:{
          "Content-type":"multipart/form-data"
        }
      });
      navigate("/profile")
    } catch (error) {
      if(error){
        console.log(error);
      }
    }
  
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  useEffect(() => {
    getUserById(id);
    console.log(id);
  }, []);

  return (
    <div className="container form-edit-add">
      <div className="row d-flex justify-content-center ">
        <div className="col-md-8 form-box px-5 background-white">
          <div className="login-title">
            <h3 className="title">Edit Profile</h3>
            <br />
            <div className="row d-flex justify-content-center">
              <div className="col profile-picture">
                <img src={preview} alt="profile" />
              </div>
            </div>
          </div>
          <Form onSubmit={(e)=>{handleSubmit(e)}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Username" value={name} />
            </Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="file"
                name="file"
                onChange={(e) => {
                  loadImage(e);
                }}
              />
            </Form.Group>
            <Form.Label></Form.Label>
            <div className="border-black mt-2">
              <Button
                type="submit"
                variant="success"
                className="btn-fill-default"
              >
                Add
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormEditProfile;
