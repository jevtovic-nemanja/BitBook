import React from "react";

import { Switch, Route, Link } from "react-router-dom";

import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export const LoginPage = props => {
    return (
        <div className="background h-100">
            <div className="container">
                <div className="row text-justify">
                    <div className="w-100 text-center mt-4">
                        <h3 className="font-weight-bold login-title">
                            Welcome to BitBook
                        </h3>
                    </div>
                    <div className="col-12 offset-md-1 col-md-10 offset-lg-0 col-lg-6 offset-xl-1 col-xl-5 mb-2">
                        <div className="login-paragraph">
                            <p className="d-none d-sm-block">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC This book is a treatise on the theory of ethics, very popular during the Renaissance.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 offset-md-1 col-md-10 offset-lg-0 col-lg-6 col-xl-5">
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
};