import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import AutomatedEmailing from "../../../assets/AutomatedEmailing.png";
import TaskWorkflow from "../../../assets/rsz_task_workflow_photo.png";
import Dashboard from "../../../assets/Dashboard.png";

import "./Features.scss";

const Features = () => {
  return (
    <section className="landing-features text-center">
      <Container>
        <h2>Here's how it works</h2>
        <br/>

        <Row>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <img src={AutomatedEmailing} alt="AutomatedEmailing" className="feature-img" />
          </Col>

          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <div className="feature-card">
              <p className="feature-list">Automated Emailing</p>
              <h3 className="feature-title">Schedule all emails in advance</h3>
              <p className="feature-text">
                Automate your emails so you can focus your time on other important matters. You can always edit and preview before sending them off. Stay organized with automated emails!
              </p>
            </div>
          </Col>

          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 5 }}>
            <div className="feature-card">
              <p className='feature-list'>Task Workflow</p>
              <h3 className="feature-title">Look ahead with visual workflows</h3>
              <p className="feature-text">
                Plan and manage tasks before and after onboarding a new hire. Make sure all team members complete tasks with email reminders before the deadline.
              </p>
            </div>
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 7 }}>
            <img src={TaskWorkflow} alt="TaskWorkflow" className="feature-img" />
          </Col>

          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 8 }}>
            <img src={Dashboard} alt="Dashboard" className="feature-img" />
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 4 }}>
            <div className="feature-card">
              <p className='feature-list'>Status Dashboard</p>
              <h3 className="feature-title">Quick Scan new hires in one place</h3>
              <p className="feature-text">
                Get an overview of the status of new members with a dashboard. View their workflows in one click to see their progress. 
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
