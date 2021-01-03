import axios from "axios";
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

export async function accessTokenCheck() {
    const release = await mutex.acquire();

    try {
      var access_token = localStorage.getItem("ACCESS_TOKEN");
      var refresh_token = localStorage.getItem("REFRESH_TOKEN");
     
      var payload = JSON.parse(atob(access_token.split(".")[1]));
      var exp_timestamp = payload["exp"];
      var current_timestamp = Math.round(new Date().getTime() / 1000);
     
      if (current_timestamp >= (exp_timestamp - 60)) {
        const token_url =
        process.env.NODE_ENV === "production"
         ? "/api/auth/token"
         : "http://localhost:5000/api/auth/token";
         
       const config = {
         headers: {
            "Content-Type": "application/json",
          },
         };
      
       var form = {
         "token": refresh_token,
       };
       
       await (async () => {
        try {
          var res = await axios.post(token_url, form, config);
          var new_access_token = res.data["accessToken"];
          console.log(new_access_token);
          localStorage.setItem('ACCESS_TOKEN', new_access_token);
       } catch (error) {
         if (error.response) {
           console.log(error.response.data);
           console.log(error.response.status);
           console.log(error.response.headers);
         } else if (error.request) {
           console.log(error.request);
         } else {
           console.log('Error ' + error.message);
         }
     
         localStorage.removeItem("ACCESS_TOKEN");
         localStorage.removeItem("REFRESH_TOKEN");
         window.location = "/login";
       }
      })();
     }
    } finally {
      release();
    }
  }