import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Dropdown, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "../css/Workflow.scss";

const Workflow = () => {
  //fetch workflow names from database
  const [workflows, getWorkflows] = useState([{ name: "" }]);
  //const baseUrl = process.env.baseURL || "http://localhost:5000"
  useEffect(() => {
    axios({
      method: "GET",
      baseURL : '/api',
      url: `/templates`,
    }).then((res) => {
      getWorkflows(res.data);
      //setloading(true)
      console.log("fetched");
    });
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
const [newWorkflow, setNewWorkflow] = useState();
  const handleNewWorkflow = (event) => {
    const {value} = event.target;
    setNewWorkflow(value);
   // console.log(newWorkflow);
  };
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
