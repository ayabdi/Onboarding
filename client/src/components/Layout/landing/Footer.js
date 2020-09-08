import React from "react";

import HarmonizeLogo from "../../../assets/logo.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="landing-footer text-light">
      <div className="footer-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-section1">
                <div>
                  <img
                    src={HarmonizeLogo}
                    alt="Harmonize Logo"
                    style={{ width: "50px" }}
                  />
                  <h3>Harmonize</h3>
                </div>
                <span>
                  Harmonize is a chat-based HR system that brings in the
                  benefits of collaboration and automation to everday mundane
                  tasks in workplaces. It allows people to achieve more by doing
                  less.
                </span>
              </div>
            </div>
            <div className="col-md-4 offset-md-2">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-section2">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/about.html"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/contact.html"
                        >
                          Contact us
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.attendancebot.com/blog/"
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/tos.html"
                        >
                          Terms of Service
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-section3">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/"
                        >
                          harmonizehq.com
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/attendancebot.html"
                        >
                          AttendanceBot
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/officeamp.html"
                        >
                          OfficeAmp
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/expensetron.html"
                        >
                          ExpenseTron
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="footer-section4">
                © 2020 Anaek Inc. All rights reserved.
              </div>
            </div>
            <div className="col-md-4 offset-md-2">
              <div className="footer-section5">
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://twitter.com/harmonizehq"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/company/harmonizehq/"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:hi@harmonizehq.com"
                    >
                      <i className="far fa-envelope"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.attendancebot.com/blog/"
                    >
                      <i className="fab fa-medium-m"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
