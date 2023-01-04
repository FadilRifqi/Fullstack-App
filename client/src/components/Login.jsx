import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../features/authSlice.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }else if(message){
      setMsg(message)
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate, message]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ name, password }));
  };

  return (
    <div className="background-grey">
      <div className="container">
        <div className="row d-flex justify-content-center ">
          <div className="col-md-4 form-box px-5 background-white">
            <div className="login-title">
              <h3 className="title">Login</h3>
            </div>
            <Form onSubmit={Auth}>
              <Form.Label>
                {(isError || msg) && (
                  <Form.Text className="text-muted">{message || msg}</Form.Text>
                )}
              </Form.Label>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Label></Form.Label>
              <Form.Text className="text-muted">
                belum punya akun? daftar sekarang!{" "}
                <Link to="/register" className="register-text">
                  {"Sign Up"}
                </Link>
              </Form.Text>
              <br />
              <Form.Text className="text-muted">
                lupa password?{" "}
                <Link to="" className="text-red">
                  {"Reset Password"}
                </Link>
              </Form.Text>
              <div className="border-black mt-2">
                <Button variant="success" type="submit" className="btn-fill">
                  {isLoading ? "Loading..." : "Sign In"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
