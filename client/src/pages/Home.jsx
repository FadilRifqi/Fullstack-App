import React from "react";
import Welcome from "../components/Welcome";
import Layout from "./Layout";
import { useSelector } from "react-redux";


const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
        <Welcome user={{user}}/>
    </Layout>
  );
};

export default Home;
