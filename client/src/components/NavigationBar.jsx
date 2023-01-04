import React from "react";
import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { LogoutUser, reset } from "../features/authSlice.js";


const NavigationBar = ({ setIsToggled, isToggled, setContainerClass }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsToggled(!isToggled);
    setContainerClass("container-body container-sidebar");
  };

  const handleLogout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate('/login')
  };
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      sticky="top"
      className="shadow"
    >
      <Container>
        <Navbar.Brand onClick={handleClick} className="clickable">
          <div className="">
            {!isToggled ? (
              <BsLayoutSidebarInset className="nav-icon" size={30} />
            ) : (
              <BsLayoutSidebarInsetReverse className="nav-icon" size={30} />
            )}
          </div>
        </Navbar.Brand>
        <Navbar.Brand className="d-flex flex-row">
          <Link to="/profile" className="profile-text-link">
            <div className="nav-box  clickable ">
              <img src="/images/logo.png" alt="logo" />
              <div className="text-center profile-text">{"     Profile"}</div>
            </div>
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <NavLink to={"/"} className="text-link box">
              <span className="">
                <AiFillHome className="mb-1" />
              </span>
              <span>{" Home"}</span>
            </NavLink>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>
            <NavLink  className={"text-logout box"}>
              <FiLogOut /> Logout
            </NavLink>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
