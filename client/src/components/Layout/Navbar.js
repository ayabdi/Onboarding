import React, { useState, useEffect, useRef } from "react";
import '../css/Navbar.scss'
import HarmonizeLogo from "../../assets/logo.png";

const _Navbar = () => {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
          <ul>
            <li>
              <button
                className="products-drop"
                onMouseOver={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                Products{" "}
                <i
                  className="fas fa-chevron-down"
                  style={{ marginLeft: "2.5px" }}
                ></i>
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
              <a target="_blank" rel="oopener noreferrer" href="https://www.attendancebot.com/blog/">
                Blog
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default _Navbar;
