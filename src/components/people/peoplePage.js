import React from "react";
import { dataService } from "../services/serviceData";
import Search from "../common/search";

import { UserDescription } from "./userDescription";

class PeoplePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            usersOriginal: [],
            users: [],
            error: ""
        };
    }

    componentDidMount() {
        this.getPeople();
    }

    bindEventHandlers() {
        this.filterUsers = this.filterUsers.bind(this);
    }

    filterUsers(searchItem) {
        const usersOriginal = this.state.usersOriginal;

        if (!searchItem) {
            this.setState({ users: usersOriginal });
            return;
        }

        const searchMatches = usersOriginal.filter(user => {
            const searchUserName = user.name.toLowerCase();
            return searchUserName.includes(searchItem);
        });
        this.setState({ users: searchMatches });
    }

    getPeople() {
        dataService.getUsers(users => this.setState({ usersOriginal: users, users: users }), error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    render() {
        if (this.state.usersOriginal.length < 1) {
            return (
                <main>
                    <Search onSearch={this.filterUsers} />
                    <h1 className="text-center">Loading users...</h1>
                </main>
            );
        }

        return (
            <main>
                <Search onSearch={this.filterUsers} />
                <p className="error">{this.state.error}</p>
                <div className="row">
                    {this.state.users.map(user => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={user._id}>
                                <UserDescription userData={user} id={user._id} />
                            </div>
                        );
                    })}
                </div>
            </main>
        );
    }
}

export default PeoplePage;