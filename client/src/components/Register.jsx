import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("User");
  const [msg, setMsg] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/login");
    } catch (error) {
      if (error) {
        setMsg(error.response.data.msg);
      }
    }
  };
  
  return (
    <div className="background-grey">
      <div className="container mt--">
        <div className="row d-flex justify-content-center ">
          <div className="col-md-4 form-box px-5 background-white ">
            <div className="login-title">
              <h3 className="title">Register</h3>
            </div>
            <Form onSubmit={register}>
              <Form.Label>
                <Form.Text className="text-muted">{msg}</Form.Text>
              </Form.Label>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setConfPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Label></Form.Label>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Select
                  defaultValue="User"
                  aria-label="Select"
                  onChange={(e) => {
                    setRole(e.target.value);
                    console.log(e.currentTarget.value)
                  }}
                >
                  <option>User</option>
                  <option>Admin</option>
                </Form.Select>
              </Form.Group>
              <Form.Label></Form.Label>
              <Form.Text className="text-muted">
                sudah punya akun? sign in sekarang!{" "}
                <Link to="/login" className="register-text">
                  {"Sign In"}
                </Link>
              </Form.Text>
              <div className="border-black mt-2">
                <Button type="submit" className="btn-fill">
                  Sign Up
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
