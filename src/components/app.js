import React from "react";
import { Switch, Route } from "react-router-dom";

import ServiceAuthentication from "./services/serviceAuthentication";

import LoginPage from "./login/loginPage";
import MainPage from "./common/mainPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new ServiceAuthentication();
    }

    render() {
        const isAuthenticated = this.authService.isAuthenticated();

        if (isAuthenticated) {
            return <MainPage />;
        } else {
            return <LoginPage />;
        }
    }
}

export default App;
