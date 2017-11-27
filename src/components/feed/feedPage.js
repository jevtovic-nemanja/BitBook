import React from "react";

import { dataService } from "../services/serviceData";
import { storageService } from "../services/serviceStorage";
import { USER_ID } from "../../constants";

class FeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        return {
            error: ""
        };
    }

    componentDidMount() {
        this.getUserId();
    }

    getUserId() {
        dataService.getProfile(profile => storageService.setStorageItem(USER_ID, profile.userId),
            error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }


    render() {
        return (
            <main>
                <p> Feed </p>
            </main>
        );
    }
}

export default FeedPage;