import React from "react";

import { dataService } from "../services/serviceData";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        return {
            profile: {
                name: "",
                bio: "",
                about: "",
                picture: "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg",
                noOfPosts: 0,
                noOfComments: 0
            },
            error: ""
        };
    }

    componentDidMount() {
        this.loadProfile();
    }

    handleNetworkRequestError(error) {
        if (error.response) {
            alert(error.response.data.error.message);
        } else if (error.request) {
            alert("There is no response from server.");
        }
    }

    loadProfile() {
        dataService.getProfile(profileDTO => this.setState({ profile: profileDTO }),
            error => this.handleNetworkRequestError(error));
    }

    render() {
        const { name, bio, about, picture, noOfPosts, noOfComments } = this.state.profile;

        return (
            <div className="profilecontent">
                <img src={picture} className="profileimage" />
                <h1 className="profilename">{name}</h1>
                <p className="profileabout">{bio}</p>
                <p className="profileabout">{about}</p>
                <div className="profilecounter">{noOfPosts}</div>
                <div className="profilecounter">{noOfComments}</div>
            </div>

        );
    }
}

export default ProfilePage;