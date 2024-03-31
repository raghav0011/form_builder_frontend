import React from 'react';
import { useLocation } from "react-router-dom";
import OrgDashboardComponent from '../../components/OrgDashboardComponent';

const OrgDashboard = () => {
  const location = useLocation();
  const orgData = location.state.orgData;
  return (
    <div>
      <OrgDashboardComponent orgData={orgData} />
    </div>
  );
}

export default OrgDashboard
