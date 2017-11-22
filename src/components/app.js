import React from "react";
import { Switch, Route } from "react-router-dom";

import {authenticationService} from "./services/serviceAuthentication";

import LoginPage from "./login/loginPage";
import Main from "./common/main";

class App extends React.Component {
    constructor(props) {
        super(props);
       
    }

    render() {
        const isAuthenticated = authenticationService.isAuthenticated();

        if (isAuthenticated) {
            return <Main />;
        } else {
            return <LoginPage />;
        }
    }
}

export default App;
