import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { ReactComponent as Google } from "../../assets/google.svg";
import { ReactComponent as Facebook } from "../../assets/facebook.svg";
import { ReactComponent as LinkedIn } from "../../assets/linkedin.svg";
import { ReactComponent as Twitter } from "../../assets/twitter.svg";
import Logo from "../../assets/logo.png";

import useStyles from "./LoginSignupStyles";
import "../css/LoginSignupStyles.scss";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const Login = () => {
  useEffect(() => { 
    document.title = "Harmonize | Login";
  }, []);

  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const [err, setErr] = useState("");

  const handleChange = async (evt) => {
    const { id, value } = evt.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const url =
      process.env.NODE_ENV === "production"
        ? "/api/auth/login"
        : "http://localhost:5000/api/auth/login";

    if (!(email, password)) {
      setErr("Email and password are required.");
    } else {
      try {
        const res = await axios.post(url, form, config);
        console.log(res.data);

        if (res.data.accessToken && res.data.refreshToken) {
          localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
          localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
          window.location = "/";
        } else {
          setErr("Something went wrong, try again later.");
        }
      } catch (error) {
        console.log(error.response.data);

        if (error.response.status === 400) {
          setErr(error.response.data);
        } else if (error.response.status === 500) {
          if (error.response.data.includes("Cannot read property 'password' of null"))
            setErr("Invalid email!");
          else 
            setErr("Something went wrong, try again later.");
        } else {
          setErr("Something went wrong, try again later.");
        }
      }
    }
  };

  var access_token = localStorage.getItem("ACCESS_TOKEN");
  var refresh_token = localStorage.getItem("REFRESH_TOKEN");

  if (access_token !== null && refresh_token !== null) {
    window.location = "/";
    return(null);
  }

  return (
    <div className="signup-page">
      <Box component="main" className={classes.container}>
        <Box className={classes.brandBox}>
          <Box
            component="a"
            href="https://www.harmonizehq.com/"
            target="_blank"
            rel="noopener"
          >
            <img src={Logo} alt="Harmonize Logo" width={45} />
          </Box>
          <Typography
            component="a"
            variant="h3"
            href="https://www.harmonizehq.com/"
            target="_blank"
            rel="noopener"
            className={classes.brand}
            style={{ color: "#fff" }}
          >
            Harmonize
          </Typography>
        </Box>
        <Paper className={classes.paper} elevation={7}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography align="center" gutterBottom className={classes.title}>
              Welcome back!
            </Typography>
            <TextField
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              value={email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              value={password}
              onChange={handleChange}
            />
            {err && (
              <Typography
                color="textSecondary"
                style={{
                  marginBottom: 0,
                  fontSize: "0.7rem",
                  color: "red",
                }}
              >
                {err}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1rem" }}
              type="submit"
              disabled={!(email && password)}
            >
              Sign in
            </Button>
          </Box>
          <Divider style={{ marginTop: "1.2rem" }} />
          <Typography
            align="center"
            color="textSecondary"
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              fontSize: "0.8rem",
            }}
          >
            Or sign in with your favorate social platform...
          </Typography>
          <Box className={classes.socialBox}>
            <IconButton
              onClick={() => {
                window.location =
                  process.env.NODE_ENV === "production"
                    ? "/api/auth/google"
                    : "http://localhost:5000/api/auth/google";
              }}
            >
              <Google fill="#4285F4" />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location =
                  process.env.NODE_ENV === "production"
                    ? "/api/auth/facebook"
                    : "http://localhost:5000/api/auth/facebook";
              }}
            >
              <Facebook fill="#3b5998" />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location =
                  process.env.NODE_ENV === "production"
                    ? "/api/auth/twitter"
                    : "http://localhost:5000/api/auth/twitter";
              }}
            >
              <Twitter fill="#00acee" />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location =
                  process.env.NODE_ENV === "production"
                    ? "/api/auth/linkedin"
                    : "http://localhost:5000/api/auth/linkedin";
              }}
            >
              <LinkedIn fill="#0e76a8" />
            </IconButton>
          </Box>
          <Typography
            align="center"
            color="textSecondary"
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              fontSize: "0.7rem",
            }}
          >
            Don't have an account? <Link to="/signup">Sign up &rarr;</Link>
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              fontSize: "0.7rem",
            }}
          >
            Forgot your password? <Link to="/forgot">Request a reminder &rarr;</Link>
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
