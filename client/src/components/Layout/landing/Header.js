import React from "react";
import './Header.scss'
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import jumbo from "../../../assets/jumbo.svg"


const Header = () => {
  return (
    <section className="main-header">
      <Container>
        <Row>
          <Col>
            <div className="text-box" md={{ span: 8}}>
              <div>
                <h2>Onboarding</h2>
                <h1>Set up new hires to go above and beyond</h1>
                <p>
                  Harmonize helps you optimize each new hire's 
                  transition to become engaging and productive team members.
                </p>
                <div>
                  <button className="ob-btn call-to-action"><Link to="/workflow">Try Now</Link></button>
                </div>
              </div>
            </div>
          </Col>
          <Col className="d-none d-lg-block">
            <div>
              <img
                src={jumbo}
                alt=""
                className='jumbo'
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Header;