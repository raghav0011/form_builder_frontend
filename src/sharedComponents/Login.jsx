import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InitialNavBar from "./InitialNavBar";
import ToastBar from "./Toastbar";
import ToastBarComponent from "./Toastbar";

const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 280,
  margin: "5em auto",
};

const Login = ({ nameHeader, email, password, handleChange, handleSubmit }) => {
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "20px 0" };
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In({nameHeader})</h2>
          </Grid>
          <TextField
            label="email"
            placeholder="Enter email"
            type="email"
            name="email"
            value={email}
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            name="password"
            fullWidth
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleSubmit}>
            Sign in
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
