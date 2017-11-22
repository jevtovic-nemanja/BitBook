import React from "react";

import { Link } from "react-router-dom";

import ServiceAuthentication from "../services/serviceAuthentication";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.authService = new ServiceAuthentication();

        this.bindEventHandlers();
    }


    initState(){
        return{
            email: "",
            password: ""
        };

    }
    
    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    logIn(event) {
        event.preventDefault();

        const data = {
            username: this.state.email,
            password: this.state.password
        };

        this.authService.logIn(data);
    }

    render() {
        return (
            <main>
                <div>
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                <form>
                    <input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInputChange} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                    <input type="submit" value="Login" onClick={this.logIn} />
                </form>
            </main>
        );
    }




}

export default LoginForm;