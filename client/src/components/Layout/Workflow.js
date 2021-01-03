import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Dropdown, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "../css/Workflow.scss";
import { accessTokenCheck } from "./Utils";

const Workflow = () => {
  //fetch workflow names from database
  const [workflows, getWorkflows] = useState([{ name: "" }]);
  //const baseUrl = process.env.baseURL || "http://localhost:5000"
  useEffect(() => {
    (async () => {
      document.title = "Harmonize | Workflow";

      await accessTokenCheck();
      var access_token = localStorage.getItem("ACCESS_TOKEN");
    
      axios({
        method: "GET",
        headers: { Authorization: 'Bearer ' + access_token, },
        url: `/api/templates`,
      }).then((res) => {
        getWorkflows(res.data);
        //setloading(true)
        console.log("fetched");
      }).catch(function (error) {
        console.log(error);

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
      });
    })();
  }, []);

  //set workflow options
  var workflowOptions = [];
  let i;
  for (i = 0; i < workflows.length; i++) {
    workflowOptions.push({
      key: workflows[i].name,
      text: workflows[i].name,
      value: workflows[i].name,
    });
  }
// handle selected value
  const [selectedValue, setSelectedValue] = useState();
  const handleSelected = (event) => {
    setSelectedValue(event.target.textContent);
    console.log(selectedValue);
  };
//handle new workflow name
const [newWorkflow, setNewWorkflow] = useState(null);
  const handleNewWorkflow = (event) => {
    const {value} = event.target;
    setNewWorkflow(value);
    console.log(newWorkflow);
  };

  const access_token = localStorage.getItem("ACCESS_TOKEN");
  const refresh_token = localStorage.getItem("REFRESH_TOKEN");

  if (access_token === null || refresh_token === null) {
    window.location = "/login";
    return (null);
  }

  return (
    <section>
      <Container className="main-page">
        <Row>
          <Col xs={2}></Col>

          <Col xs={8}>
            <h1 className="title">Set up your new hire’s workflow!</h1>
            <h2 className="subtitle">Use an existing workflow template:</h2>
            <Dropdown
              placeholder="Choose a workflow template"
              fluid
              clearable
              selection
              options={workflowOptions}
              onChange={handleSelected}
            />
            <Row className="line">
              <Col xs={5}>
                <hr />
              </Col>
              <Col xs={2}>
                <h4>OR</h4>
              </Col>
              <Col xs={5}>
                <hr />
              </Col>
            </Row>
            <h2 className="subtitle">Create a new workflow template:</h2>
            <Input placeholder="Name workflow as…" name={newWorkflow} value={newWorkflow}onChange = {handleNewWorkflow} />;
            <div className="action">
              <button className="ob-btn">
                <Link to={{ pathname: '/hire', state: {selectedValue, newWorkflow} }}>Get started</Link>
              </button>
            </div>
          </Col>

          <Col xs={2}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default Workflow;
