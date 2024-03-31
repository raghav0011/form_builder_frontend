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

const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 280,
  margin: "5em auto",
};

const Register = ({ nameHeader,name, handleChange, handleSubmit,email, password }) => {
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
            <h2>Register({nameHeader})</h2>
          </Grid>
          <TextField
            label="Name"
            placeholder="Enter name"
            fullWidth
            required
            name="name"
            value={name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            placeholder="Enter email"
            type="email"
            fullWidth
            required
            name="email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            name="password"
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
            Register
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default Register;
