import React, { useEffect } from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Logo from "../../assets/logo.png";

import useStyles from "./LoginSignupStyles";
import "../css/LoginSignupStyles.scss";
import { accessTokenCheck } from "./Utils";

const Logout = () => {
  const classes = useStyles();

  useEffect(() => { 
    (async () => {
      document.title = "Harmonize | Logout";

      await accessTokenCheck();
      var access_token = localStorage.getItem("ACCESS_TOKEN");
      var refresh_token = localStorage.getItem("REFRESH_TOKEN");

      var timeout = 1000;
      var redir_page = "/";

      if (refresh_token == null) {
        timeout = 0;
        redir_page = "/login";
      } else {
        const url =
        process.env.NODE_ENV === "production"
          ? "/api/auth/logout"
          : "http://localhost:5000/api/auth/logout";

        const form = {
          token: refresh_token
        };

        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token,
          },
        };

        try {
          const res = await axios.post(url, form, config);
          console.log(res.data);
        } catch (error) {
          console.log(error.response.data);
          redir_page = "/login";
          timeout = 0;
        } 
      }

      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");

      setTimeout(function () {
        window.location = redir_page;
      }, timeout);
    })();
  }, []);

  const access_token = localStorage.getItem("ACCESS_TOKEN");
  const refresh_token = localStorage.getItem("REFRESH_TOKEN");

  if (access_token === null || refresh_token === null) {
    window.location = "/login";
    return (null);
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
          <Box component="form">
            <Typography align="center" gutterBottom className={classes.title}>
              Logging out...
            </Typography>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Logout;
