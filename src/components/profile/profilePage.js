import React from "react";

import { dataService } from "../services/serviceData";
import { redirect } from "../services/serviceRedirect";

import { Profile } from "../profile/profile";
import Modal from "react-modal";
import EditProfile from "./editProfile";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            profile: {
                name: "Loading...",
                email: "",
                aboutShort: "",
                about: "",
                avatarUrl: "../../images/batman.jpg",
                postsCount: 0,
                commentsCount: 0
            },
            edit: {
                name: "",
                email: "",
                aboutShort: "",
                about: "",
                avatarUrl: ""
            },
            show: false,
            error: ""
        };
    }

    bindEventHandlers() {
        this.toggleModalShow = this.toggleModalShow.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        dataService.getProfile(profile => this.loadProfile(profile), error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadProfile(profile) {
        this.setState({
            profile: profile,
            edit: {
                name: profile.name,
                email: profile.email,
                aboutShort: profile.aboutShort,
                about: profile.about,
                avatarUrl: profile.avatarUrl
            }
        });
    }

    toggleModalShow() {
        event.preventDefault();

        if (this.state.show === false) {
            this.setState({ show: true });
        } else {
            this.setState({ show: false });
        }
    }

    updateProfile(newData) {
        dataService.updateProfile(newData, profile => this.loadProfile(profile),
            error => this.handleNetworkRequestError(error));
        this.toggleModalShow();
    }

    getModalStyle() {
        if (screen.width < 579) {
            return {
                content: {
                    position: "absolute",
                    top: "15%",
                    left: "8%",
                    right: "8%",
                    bottom: "15%",
                    border: "0.5px solid rgba(43, 122, 120, 0.5)",
                    background: "#feffff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "30px"

                }
            };

        } else {
            return {
                content: {
                    position: "absolute",
                    top: "15%",
                    left: "30%",
                    right: "30%",
                    bottom: "15%",
                    border: "0.5px solid rgba(43, 122, 120, 0.5)",
                    background: "#feffff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "30px"
                }
            };
        };
    }

    render() {

        const { name, email, aboutShort, about, avatarUrl, postsCount, commentsCount } = this.state.profile;
        const { show, error } = this.state;

        return (
            <main className="container-fluid">
                <div className="row w-75 mx-auto">

                    <Profile user={this.state.profile} />

                    <div className="col-12">
                        <div className="text-center ">
                            <button className="btn buttonLight my-2 my-sm-0" onClick={this.toggleModalShow} >Edit Profile</button>
                        </div>
                    </div>

                    <Modal isOpen={show} style={this.getModalStyle()} className="editProfileModal" >
                        <EditProfile toggleModal={this.toggleModalShow} updateProfile={this.updateProfile} edit={this.state.edit} />
                    </Modal>
                </div>
            </main>
        );
    }
}

export default ProfilePage;