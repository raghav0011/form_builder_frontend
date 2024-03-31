import React from "react";
import { useLocation } from "react-router-dom";
import UserDashboardComponent from "../../components/UserDashboardComponent";

const UserDashboard = () => {
  const location = useLocation();
  const userData = location.state.userData;
  return (
    <div>
      <UserDashboardComponent userData={userData} />
    </div>
  );
};

export default UserDashboard;
