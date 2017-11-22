import React from "react";

import { Link } from "react-router-dom";

import {authenticationService} from "../services/serviceAuthentication";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
   

        this.bindEventHandlers();

    }

    initState() {
        return {
            name: "",
            email: "",
            password: "",
            error: false
        };

    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.register = this.register.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleNetworkRequestError(error) {
        if (error.response) {
            this.setState({ error: error.response.data.error.message });
        } else if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    register(event) {
        event.preventDefault();

        const validation = this.validateInput();

        if (validation) {
            const { name, email, password, error } = this.state;

            const data = {
                username: email,
                password: password,
                name: name,
                email: email
            };

            authenticationService.register(data, error => this.handleNetworkRequestError(error));
        }
    }

    validateInput() {
        const { name, email, password } = this.state;

        if (!name) {
            this.setState({ error: "Please enter your name." });
            return false;
        } else if (!email) {
            this.setState({ error: "Please enter your email address." });
            return false;
        } else if (!email.includes("@")) {
            this.setState({ error: "A valid email address contains \"@\"." });
            return false;
        } else if (!password) {
            this.setState({ error: "Please enter your password." });
            return false;
        } else if (password.length < 6) {
            this.setState({ error: "Your password must contain at least 6 characters." });
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <main className="form">
                <div>
                    <Link to="/login"><button className="btn btn-light">Login</button></Link>
                    <Link to="/register"><button className="btn btn-light">Register</button></Link>
                </div>


                <form>

                    <div className="form-group">
                        <label htmlFor="exampleInputText1">Full Name</label>
                        <input type="text" className="form-control" id="exampleInputText1" aria-describedby="emailHelp" placeholder="Full Name" name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                        <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Min 6 characters" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <div className="error">
                        {this.state.error
                            ? <p>{this.state.error}</p>
                            : <p></p>
                        }
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.register}>Register</button>

                </form>

            </main>
        );


    }



}

export default RegisterForm;