import React from "react";

const Welcome = ({ user }) => {
  console.log(user)
  return (
    <div className="container">
      <h1 className="display-4">
        Welcome <span>{user.user && user.user.name}</span>
      </h1>
      <h2 className="">
        Anda Login Sebagai <span>{user.user && user.user.role }</span>
      </h2>
    </div>
  );
};

export default Welcome;
