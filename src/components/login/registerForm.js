import React from "react";

import { Link } from "react-router-dom";

import ServiceAuthentication from "../services/serviceAuthentication";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.authService = new ServiceAuthentication();

        this.bindEventHandlers();

    }

    initState(){
        return{
            fullName: "",
            email: "",
            password: ""
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

    register(event) {
        event.preventDefault();
        
        const data = {
            username: this.state.email,
            password: this.state.password,
            name: this.state.fullName,
            email: this.state.email
        };

        this.authService.register(data);
    }

    render() {
        return (
            <main>
                <div>
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                <form>
                    <input type="text" name="fullName" placeholder="Full Name" value={this.state.fullName} onChange={this.handleInputChange} />
                    <input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInputChange} />
                    <input type="password" name="password" placeholder="Min 6 characters" value={this.state.password} onChange={this.handleInputChange} />
                    <input type="submit" value="Register" onClick={this.register} />
                </form>
            </main>
        );


    }



}

export default RegisterForm;