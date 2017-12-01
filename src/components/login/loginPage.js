import React from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { Switch, Route, Link } from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="background">
                <div className=" container">
                    <div className="row">
                        <div className="welcomeText col-sm-12 col-md-12 col-lg-6">
                            <h1 className="loginTitle">Welcome to BitBook </h1>
                            <p className="loginParagraph"> Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from
                 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up
                  one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                  literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  (The Extremes of Good and Evil) by Cicero, written in 45 BC This book is a treatise on the theory of ethics, very popular
                   during the Renaissance.</p>
                        </div>


                        <div className="col-sm-12 col-md-12 col-lg-6  welcomeText">
                            <Switch>
                                <Route exact path="/login" component={LoginForm} />
                                <Route exact path="/register" component={RegisterForm} />
                                <Route path="/" component={LoginForm} />
                            </Switch>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}


export default LoginPage;