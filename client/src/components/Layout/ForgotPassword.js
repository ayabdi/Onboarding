import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Logo from "../../assets/logo.png";

import useStyles from "./LoginSignupStyles";
import "../css/LoginSignupStyles.scss";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const ForgotPassword = () => {
  useEffect(() => { 
    document.title = "Harmonize | Forgot password";
  }, []);

  const classes = useStyles();

  const [form, setForm] = useState({
    email: ""
  });
  const { email } = form;

  const [err, setErr] = useState("");

  const handleChange = async (evt) => {
    const { id, value } = evt.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const url =
      process.env.NODE_ENV === "production"
        ? "/api/auth/forgot"
        : "http://localhost:5000/api/auth/forgot";

    if (!(email)) {
      setErr("Email is required.");
    } else {
      try {
        const res = await axios.post(url, form, config);
        console.log(res.data);

        //parse response
      } catch (error) {
        console.log(error.response.data);

        if (error.response.status === 400) {
          setErr(error.response.data);
        } else if (error.response.status === 500) {
          
        } else {
          setErr("Something went wrong, try again later.");
        }
      }
    }
  };

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
              Request your forgotten password...
            </Typography>
            <TextField
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              value={email}
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
              disabled={!(email)}
            >
              Request Password
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default ForgotPassword;
