import React from "react";
import { Link } from "react-router-dom";

import { authenticationService } from "../services/serviceAuthentication";

export const Header = props => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#3aafa9"}} >
            <Link to="/" ><p className="navbar-brand font-weight-bold" style={{color: "#17252a", fontSize: "26px"}}>BitBook</p> </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <Link to="/profile" > <li className="nav-item">
                        <p className="nav-link ml-2 h5" href="#">Profile <span className="sr-only">(current)</span></p>
                    </li></Link>
                    <Link to="/feed" ><li className="nav-item">
                        <p className="nav-link ml-2 h5" href="#">Feed</p>
                    </li></Link>
                    <Link to="/people" ><li className="nav-item">
                        <p className="nav-link ml-2 h5" href="#">People</p>
                    </li></Link>
                </ul>
                <div className="ml-auto">
                    <button className="btn my-2 my-sm-0 buttonLight" onClick={authenticationService.logOut} >Logout</button>
                </div>
            </div>
        </nav>
    );
};