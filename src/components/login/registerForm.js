import React from "react";

import { Link } from "react-router-dom";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
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
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    register() {
        event.preventDefault();
        
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
                        <input type="text" className="form-control" id="exampleInputText1" aria-describedby="emailHelp" placeholder="Full Name" name="fullName" value={this.state.fullName} onChange={this.handleInputChange}/>
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
                
                    <button type="submit" className="btn btn-primary" onClick={this.register}>Register</button>

                </form>



            </main>
        );


    }



}

export default RegisterForm;