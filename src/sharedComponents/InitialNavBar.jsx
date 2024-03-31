import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Login from "./Login";
import Register from "./Register";
import useUserApi from "../hooks/useUserApi";
import useOrgApi from "../hooks/useOrgApi";

export default function InitialNavBar() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [
    {
      userHandleMutation,
      userHandleRegisterSubmit,
      userHandleUserRegisterChange,
      userHandleUserLoginChange,
      userHandleLoginSubmit,
    },
    { userRegister, userLogin },
  ] = useUserApi();

  const [
    {
      orgHandleMutation,
      orgHandleRegisterSubmit,
      orgHandleOrgRegisterChange,
      orgHandleOrgLoginChange,
      orgHandleLoginSubmit,
    },
    { orgRegister, orgLogin },
  ] = useOrgApi();

  return (
    <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User Login" value="1" />
            <Tab label="User Register" value="2" />
            <Tab label="Organization Login" value="3" />
            <Tab label="Organization Register" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Login
            nameHeader={"User"}
            email={userLogin?.email}
            password={userLogin?.password}
            handleChange={userHandleUserLoginChange}
            handleSubmit={userHandleLoginSubmit}
          />
        </TabPanel>
        <TabPanel value="2">
          <Register
            nameHeader={"User"}
            name={userRegister?.name}
            email={userRegister?.email}
            password={userRegister?.password}
            handleSubmit={userHandleRegisterSubmit}
            handleChange={userHandleUserRegisterChange}
          />
        </TabPanel>

        <TabPanel value="3">
          <Login
            nameHeader={"Organization"}
            email={orgLogin?.email}
            password={orgLogin?.password}
            handleChange={orgHandleOrgLoginChange}
            handleSubmit={orgHandleLoginSubmit}
          />
        </TabPanel>
        <TabPanel value="4">
          <Register
            nameHeader={"Organization"}
            name={orgRegister?.name}
            email={orgRegister?.email}
            password={orgRegister?.password}
            handleSubmit={orgHandleRegisterSubmit}
            handleChange={orgHandleOrgRegisterChange}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
