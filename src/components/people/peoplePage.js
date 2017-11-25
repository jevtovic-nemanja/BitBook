import React from "react";
import { dataService } from "../services/serviceData";

import { UserDescription } from "./userDescription";

class PeoplePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        return {
            users: []
        };
    }

    componentDidMount() {
        this.getPeople();
    }

    getPeople() {
        dataService.getUsers(users => this.setState({ users: users }), error => this.handleNetworkRequestError(error));

    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    render() {
        return (
            <div>
                {this.state.users.map(user => {
                    return <UserDescription userData={user} key={user._id} id={user._id} />;
                })}
            </div>
        );
    }
}

export default PeoplePage;