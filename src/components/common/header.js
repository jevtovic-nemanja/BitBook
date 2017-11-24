import React from "react";
import { Link } from "react-router-dom";

import { authenticationService } from "../services/serviceAuthentication";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    logOut() {
        authenticationService.logOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" ><p className="navbar-brand">BitBook</p> </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <Link to="/profile" > <li className="nav-item active">
                            <p className="nav-link" href="#">Profile <span className="sr-only">(current)</span></p>
                        </li></Link>
                        <Link to="/feed" ><li className="nav-item">
                            <p className="nav-link" href="#">Feed</p>
                        </li></Link>
                        <Link to="/people" ><li className="nav-item">
                            <p className="nav-link" href="#">People</p>
                        </li></Link>
                    </ul>
                    <div className="ml-auto">
                        <button className="btn btn-outline-success my-2 my-sm-0 logout" onClick={this.logOut} >Logout</button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;