import React from 'react'
import { Link  } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-custom-2">
                <div className="container">
                    <Link className="navbar-brand navbar-label" to="/">Harmonize</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
                    <div className="collapse navbar-collapse justify-content-end " id="navbarText">
                        <ul className="nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Features
                              </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#">About Us</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Contact Us <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Blog <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>

                    </div>
                </div>

            </nav>
    )
}
export default Navbar;