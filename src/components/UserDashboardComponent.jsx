import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import useUserApi from "../hooks/useUserApi";
import UserDashBoardTab1 from "./UserDashBoardTab1";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const UserDashboardComponent = ({ userData }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [
    { userHandleMutation, userHandlePostForm, ...handlers },
    { userRegister, userLogin, orgForm },
  ] = useUserApi();

  const logout = () => {
    localStorage.removeItem("jwt");

    navigate("/auth");
  };

  return (
    <div>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <h1>Welcome, {userData.email}</h1>
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Org Forms" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UserDashBoardTab1
              userHandleMutation={userHandleMutation}
              orgForm={orgForm}
              handlePost={userHandlePostForm}
              userId={userData?.id}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default UserDashboardComponent;
