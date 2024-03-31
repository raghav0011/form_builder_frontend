import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import OrgDashboardTab from "./OrgDashboardTab";
import useOrgApi from "../hooks/useOrgApi";
import OrgDashboardTab2 from "./OrgDashboardTab2";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const orgDashboardComponent = ({ orgData, history }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [
    { orgHandleOrgPostForm, orgHandleMutation, ...handlers },
    { orgRegister, orgLogin, userFormSubmission },
  ] = useOrgApi();

  const logout = () => {
    localStorage.removeItem("jwt");

    navigate("/auth");
  };

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        <h1>Welcome, {orgData.email}</h1>
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Create Form" value="1" />
              <Tab label="User" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <OrgDashboardTab
              postForm={orgHandleOrgPostForm}
              orgData={orgData}
            />
          </TabPanel>
          <TabPanel value="2">
            <OrgDashboardTab2
              handleMutation={orgHandleMutation}
              userFormSubmission={userFormSubmission}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default orgDashboardComponent;
