import React from "react";

import { dataService } from "../services/serviceData";
import { redirect } from "../services/serviceRedirect";

import { Profile } from "../profile/profile";
import Modal from "react-modal";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            profile: {
                _name: "Loading...",
                _email: "",
                _aboutShort: "",
                _about: "",
                _avatarUrl: "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg",
                _postsCount: 0,
                _commentsCount: 0
            },
            edit: {
                name: "",
                email: "",
                aboutShort: "",
                about: "",
                avatarUrl: "",
            },
            show: false,
            error: ""
        };
    }

    bindEventHandlers() {
        this.toggleModalShow = this.toggleModalShow.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        this.getProfile();
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => {
            prevState.edit[name] = value;
            prevState.error = "";
            return prevState;
        });
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
        this.setState({
            profile: profile,
            edit: {
                name: profile._name,
                email: profile._email,
                aboutShort: profile._aboutShort,
                about: profile._about,
                avatarUrl: profile._avatarUrl
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

    validateInput() {
        const { name, email, aboutShort, about, avatarUrl } = this.state.edit;

        if (!name) {
            this.setState({ error: "Please enter a name." });
            return false;
        } else if (!email) {
            this.setState({ error: "Please enter an email address." });
            return false;
        } else if (!email.includes("@")) {
            this.setState({ error: "A valid email address contains \"@\"." });
            return false;
        } else if (!aboutShort) {
            this.setState({ error: "Please enter a short bio." });
            return false;
        } else if (!about) {
            this.setState({ error: "Please enter something about yourself." });
            return false;
        } else if (!avatarUrl) {
            this.setState({ error: "Please set your profile picture." });
            return false;
        } else {
            return true;
        }
    }

    updateProfile(event) {
        event.preventDefault();
        const isValid = this.validateInput();

        const dataObject = this.state.edit;

        if (isValid) {
            dataService.updateProfile(dataObject, profile => this.loadProfile(profile),
                error => this.handleNetworkRequestError(error));
            this.toggleModalShow();
        }
    }

    render() {

        const { _name, _email, _aboutShort, _about, _avatarUrl, _postsCount, _commentsCount } = this.state.profile;
        const { name, email, aboutShort, about, avatarUrl } = this.state.edit;
        const { show, error } = this.state;

        const modalStyle = {
            overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.75)"
            },
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

        return (
            <main className="container">
                <Profile user={this.state.profile} />

                <div className="text-center editButton">
                    <button className="btn buttonLight my-2 my-sm-0" onClick={this.toggleModalShow} >Edit Profile</button>
                </div>

                <Modal isOpen={show} style={modalStyle} >
                    <div className="editForm">
                        <form>
                            <label htmlFor="exampleInputText1">Name</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                id="exampleInputText1"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="exampleInputEmail1">Contact Email</label>
                            <input
                                type="email"
                                className="form-control mb-3"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}
                            />
                            <small id="emailHelp" className="form-text text-muted mb-3">We will never share your email with anyone else.</small>

                            <label htmlFor="exampleInputText2">Bio</label>
                            <textarea
                                className="form-control mb-3"
                                id="exampleInputText2"
                                placeholder="Short Bio"
                                name="aboutShort"
                                value={aboutShort}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="exampleInputText3">About</label>
                            <textarea
                                className="form-control mb-3"
                                id="exampleInputText3"
                                placeholder="About"
                                name="about"
                                rows="5"
                                value={about}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="exampleInputText4">Picture</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                id="exampleInputText4"
                                placeholder="Picture URL"
                                name="avatarUrl"
                                value={avatarUrl}
                                onChange={this.handleInputChange}
                            />

                        </form>
                    </div>
                    <div className="error">
                        {error
                            ? <p>{error}</p>
                            : <p></p>
                        }
                    </div>
                    <div>
                        <button className="btn buttonLight my-2 my-sm-0 saveButtonStyle" onClick={this.updateProfile}>
                            Save
                        </button>
                        <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.toggleModalShow}>
                            Close
                        </button>
                    </div>
                </Modal>
            </main>
        );
    }
}

export default ProfilePage;