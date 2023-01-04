import React from "react";
import FriendList from "../components/FriendList";
import MyProduct from "../components/MyProduct";
import Layout from "./Layout";





const Dashboard = () => {
 
  return (
    <Layout>
      <MyProduct />
      <FriendList />
    </Layout>
  );
};

export default Dashboard;
