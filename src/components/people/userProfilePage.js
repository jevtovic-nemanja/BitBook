import React from "react";

import { dataService } from "../services/serviceData";
import { redirect } from "../services/serviceRedirect";

import { Profile } from "../profile/profile";

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            profile: {
                name: "Loading...",
                email: "",
                aboutShort: "",
                about: "",
                avatarUrl: "http://3.bp.blogspot.com/JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg",
                postsCount: 0,
                commentsCount: 0
            },
            error: ""
        };
    }

    componentDidMount() {
        this.getProfile(this.props.match.params.id);
    }

    getProfile(id) {
        dataService.getUserProfile(id, profile => this.loadProfile(profile), error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadProfile(profile) {
        this.setState({ profile: profile });
    }

    render() {

        let { name, email, aboutShort, about, avatarUrl, postsCount, commentsCount } = this.state.profile;
        let { error } = this.state;

        return (
            <main className="container-fluid">
                <div className="row w-75 mx-auto">
                    <Profile user={this.state.profile} />
                </div>
            </main>
        );
    }
}

export default UserProfilePage;


