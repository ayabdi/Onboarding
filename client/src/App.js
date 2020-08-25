import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import HireForm from "./components/Layout/HireForm";
import ModalForm from "./components/Layout/ModalForm"

import {Provider} from 'react-redux'


import "./App.scss";

function App() {
  return (

    <Router>
      <Fragment>
        <Navbar />
  
     
        
        <section>
          <Switch>
            <Route exact path ="/hire" component={HireForm}/>
          </Switch>
        </section>
        
      </Fragment>
    </Router>

  );
}

export default App;
