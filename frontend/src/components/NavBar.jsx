import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/icons8-connection-80.png';


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark modern-navbar-bg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="CampuzCons Logo" height="30" className="d-inline-block align-top" />
                    CampuzCons
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/mentors">
                                Mentors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events">
                                Events
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
