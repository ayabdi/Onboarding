import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Register from "./components/Layout/Register";

import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <header>
               <div className="spacer">
                &nbsp;
            </div>
            <br/>
            <br/>

            <div className='container-small'>
                Jane Doe's Workflow
            </div>
        </header>

     
        
        <section>
          <Switch>
            <Route exact path ="/register" component={Register}/>
          </Switch>
        </section>
        
      </Fragment>
    </Router>
  );
}

export default App;
