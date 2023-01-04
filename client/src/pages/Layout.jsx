import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";

const Layout = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [containerClass, setContainerClass] = useState("container-body");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <React.Fragment>
      <NavigationBar
        setIsToggled={setIsToggled}
        isToggled={isToggled}
        setContainerClass={setContainerClass}
      />
      <SideBar
        setIsToggled={setIsToggled}
        isToggled={isToggled}
        setContainerClass={setContainerClass}
      />
      <div className="body">
        <div className="container">
          <div className={containerClass}>
            <main className="grid-scroll">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
