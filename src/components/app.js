import React from "react";
import { Switch, Route } from "react-router-dom";

import ServiceAuthentication from "./services/serviceAuthentication";

import LoginPage from "./login/loginPage";
import Main from "./common/main";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new ServiceAuthentication();
    }

    render() {
        const isAuthenticated = this.authService.isAuthenticated();

        if (isAuthenticated) {
            return <Main />;
        } else {
            return <LoginPage />;
        }
    }
}

export default App;
