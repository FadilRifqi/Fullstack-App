import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const {user} = useSelector((state)=>state.auth)

  console.log(user)
  return (
    <div className="body">
      <div className="container profile">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 pt-4 text-center">
            <div className="profile-picture">
              <img src={user.url} alt="profile" />
              <p className="lead">
                {user.name}
              </p>
              <h6 className="lead mb-4">
                {user.role}
              </h6>
            </div>
            <Link to={`/profile/edit/${user.uuid}`}>
              <Button variant="warning" className="btn-hover">Edit Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
