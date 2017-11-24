import React from "react";

import { dataService } from "../services/serviceData";
import { redirect } from "../services/serviceRedirect";

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            profile: {
                _name: "",
                _email: "",
                _bio: "",
                _about: "",
                _picture: "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg",
                _noOfPosts: 0,
                _noOfComments: 0
            },
            error: ""
        };
    }

    componentDidMount() {
        this.getProfile();
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    getProfile() {
        dataService.getProfile(profile => this.loadProfile(profile), error => this.handleNetworkRequestError(error));
    }

    loadProfile(profile) {
        this.setState({ profile: profile });
    }

    render() {

        let { _name, _email, _bio, _about, _picture, _noOfPosts, _noOfComments } = this.state.profile;
        let { error } = this.state;

        return (
            <div>

                <div className="profilecontent">
                    <img src={_picture} className="profileimage" />
                    <h1 className="profilename">{_name}</h1>
                    <p className="profileabout">{_bio}</p>
                    <p className="profileabout">{_about}</p>
                    <div className="profilecounter">{_noOfPosts}</div>
                    <div className="profilecounter">{_noOfComments}</div>
                </div>
            </div>
        );
    }
}

export default UserProfilePage;