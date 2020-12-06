import React, { useEffect } from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Logo from "../../assets/logo.png";

import useStyles from "./LoginSignupStyles";
import "../css/LoginSignupStyles.scss";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const Logout = () => {
  const classes = useStyles();

  useEffect(() => { 
    document.title = "Harmonize | Logout";

    const url =
    process.env.NODE_ENV === "production"
      ? "/api/auth/logout"
      : "http://localhost:5000/api/auth/logout";

    const refresh_token = localStorage.getItem("REFRESH_TOKEN");

    if (refresh_token != null) {
      const form = {
        token: refresh_token
      };

      (async function() {
        try {
          const res = await axios.post(url, form, config);
          console.log(res.data);
        } catch (error) {
          console.log(error.response.data);
        }
      })();
   }

    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");

    setTimeout(function (){
      window.location = "/";
    }, 1000);
  }, []);

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
