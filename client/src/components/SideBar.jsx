import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AiFillDashboard } from "react-icons/ai";
import { BsCart4, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser, reset } from "../features/authSlice.js";
import {GoMail} from 'react-icons/go'

const SideBar = ({ isToggled, setIsToggled, setContainerClass }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsToggled(!isToggled);
    setContainerClass("container-body");
  };

  const handleLogout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate("/login");
  };

  return isToggled ? (
    <Navbar className="body" variant="" fixed="bottom">
      <Container>
        <Nav className=" bg-dark sidebar p-5 d-flex flex-column shadow">
          <Navbar.Brand className="switch">
            <Nav.Link onClick={handleClick}>
              <BsLayoutSidebarInsetReverse className="nav-icon" size={30} />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Brand className="mb-4">
            <Link to="/profile" className="profile-text-link">
              <div className="side-box  clickable ">
                <img src="/images/logo.png" alt="logo" />
                <div className="text-center profile-text">{"Profile"}</div>
              </div>
            </Link>
          </Navbar.Brand>
          <div className="sidebar-sticky">
            <Nav.Link>
              <NavLink to="/dashboard" className="text-link">
                <AiFillDashboard /> Dashboard
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/inbox" className="text-link">
                <GoMail /> In Box
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/products" className="text-link">
                <BsCart4 /> Products
              </NavLink>
            </Nav.Link>
              <Nav.Link>
                <NavLink to="/users" className="text-link">
                  <FiUsers /> Users
                </NavLink>
              </Nav.Link>
          </div>
          <Nav>
            <Nav.Link onClick={handleLogout}>
              <NavLink className={"text-logout box"}>
                <FiLogOut /> Logout
              </NavLink>
            </Nav.Link>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  ) : (
    <></>
  );
};

export default SideBar;
