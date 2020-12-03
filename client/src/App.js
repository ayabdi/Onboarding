import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Workflow from "./components/Layout/Workflow";
import NewHirePage from "./components/Layout/NewHirePage";
import Dashboard from "./components/Layout/Dashboard";
import Login from "./components/Layout/Login";
import Signup from "./components/Layout/Signup";
import Logout from "./components/Layout/Logout";

import "./App.scss"

function App() {
  return (

    <Router>
      <Fragment>
        <Navbar />   
        <section>
          <Switch>
           <Route exact path ="/" component={Landing}/> 
            <Route exact path ="/hire" component={NewHirePage}/>
            <Route exact path ='/dashboard' component={Dashboard}/>
            <Route exact path = '/workflow' component = {Workflow}/>
            <Route exact path = '/login' component = {Login}/>
            <Route exact path = '/signup' component = {Signup}/>
            <Route exact path = '/logout' component = {Logout}/>
          </Switch>
        </section>
        
      </Fragment>
    </Router>

  );
}

export default App;
