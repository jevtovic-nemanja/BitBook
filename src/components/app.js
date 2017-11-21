import React from "react";
import LoginPage from "./login/loginPage";
import { Switch, Route } from "react-router-dom";

import ServiceAuthentication from "./services/serviceAuthentication";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isAuthenticated = ServiceAuthentication.isAuthenticated();

        if (isAuthenticated) {
            return 
        } else {
            return (
                <LoginPage />
            );
        }
    }
}

export default App;
