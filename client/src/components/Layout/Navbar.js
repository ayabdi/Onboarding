import React, { useState, useEffect, useRef } from "react";
import '../css/Navbar.scss'
import HarmonizeLogo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const _Navbar = () => {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const If = ({ condition, children }) => {
    if (condition) {
      return children;
    }

    return null;
  };

  const navigate = (href, newTab) => {
    const a = document.createElement("a");
    a.href = href;
    if (newTab) {
      a.setAttribute("target", "_blank");
    }
    a.click();
  };

  const [navWhite, setNavWhite] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 50) {
        setNavWhite(true);
      } else {
        setNavWhite(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <nav className={`navbar-custom ${navWhite ? "white" : ""}`}>
        <div className="container">
          <a href="/" className="navbar-brand">
            <img src={HarmonizeLogo} alt="logo" /> Harmonize
          </a>
          <ul id="header">
          <li>
            <Link to= '/dashboard'>Dashboard</Link>
            </li>
            <li>
            <Link to= '/workflow'>new Workflow</Link>
            </li>
            <li>
              <button
                className="products-drop"
                onMouseOver={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                Products{" "}
                <FontAwesomeIcon
                          icon={faChevronDown}
                         // className="chevron-down"
                         style={{ marginLeft: "2.5px" }}
                        
                        ></FontAwesomeIcon>
    
                {showDropdown && (
                  <div className="product-dropdown" ref={dropdownRef}>
                    <div className="dropdown-content">
                      <a target="_blank" rel="noreferrer" href="/calculator">
                        Paycheck Calculator
                      </a>
                      <a target="_blank" rel="noreferrer" href="/orgchart">
                        Organizational Chart
                      </a>
                      <a target="_blank" rel="noreferrer" href="/contract">
                        Contract Generator
                      </a>
                      <a href="#!">Onboarding</a>
                    </div>
                  </div>
                )}
              </button>
            </li>
           
            <li>
              
              <Link target="_blank" rel="oopener noreferrer" to="https://www.attendancebot.com/blog/">
                Blog
              </Link>
              
            </li>
            <If condition={localStorage.getItem("ACCESS_TOKEN") != null && localStorage.getItem("REFRESH_TOKEN") != null}>
              <li>
                <a target="_self" rel="oopener noreferrer" href="/logout">
                  Logout
                </a>
              </li>
            </If>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default _Navbar;
