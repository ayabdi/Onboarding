import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AutomatedEmailing from "../../../assets/AutomatedEmailing.svg";
import TaskWorkflow from "../../../assets/TaskWorkflow.svg";
import StatusDashboard from "../../../assets/StatusDashboard.svg";

import "./Showcase.scss";

const Showcase = () => {
  return (
    <section className="main-feature">
      <Container>
        <Row className="feature-section">
          <Col lg={{ span: 4 }}>
            <img src={AutomatedEmailing} alt="feature 1" className="feature-img" />
            <h2>Automated Emailing</h2>
            <p>
              Schedule automated emails to be sent to your team during the employee onboarding process
            </p>
          </Col>
          <Col lg={{ span: 4 }}>
            <img src={TaskWorkflow} alt="feature 2" className="feature-img" />
            <h2>Task Workflow</h2>
            <p>
              Stay updated with an overview of tasks that need to be completed before and after each hire's first day.
            </p>
          </Col>
          <Col lg={{ span: 4 }}>
            <img src={StatusDashboard} alt="feature 3" className="feature-img" />
            <h2>Status Dashboard</h2>
            <p>
              Keep track of all new hire's onboarding status in one glance or their progress with just one click.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Showcase;
