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

    getProfile() {
        dataService.getProfile(profile => this.loadProfile(profile), error => this.handleNetworkRequestError(error));
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

    loadProfile(profile) {
        this.setState({
            profile: profile,
            edit: {
                editName: profile.name,
                editEmail: profile.email,
                editAboutShort: profile.aboutShort,
                editAbout: profile.about,
                editAvatarUrl: profile.avatarUrl
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

    validateInput() {
        const { editName, editEmail, editAboutShort, editAbout, editAvatarUrl } = this.state.edit;

        if (!editName) {
            this.setState({ error: "Please enter a name." });
            return false;
        } else if (!editEmail) {
            this.setState({ error: "Please enter an email address." });
            return false;
        } else if (!editEmail.includes("@")) {
            this.setState({ error: "A valid email address contains \"@\"." });
            return false;
        } else if (!editAboutShort) {
            this.setState({ error: "Please enter a short bio." });
            return false;
        } else if (!editAbout) {
            this.setState({ error: "Please enter something about yourself." });
            return false;
        } else if (!editAvatarUrl) {
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
        const { editName, editEmail, editAboutShort, editAbout, editAvatarUrl } = this.state.edit;
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
                        <div className="editForm">
                            <form>
                                <label htmlFor="exampleInputText1">Name</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    id="exampleInputText1"
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.edit.name}
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
                                    value={this.state.edit.email}
                                    onChange={this.handleInputChange}
                                />
                                <small id="emailHelp" className="form-text text-muted mb-3">We will never share your email with anyone else.</small>

                                <label htmlFor="exampleInputText2">Bio</label>
                                <textarea
                                    className="form-control mb-3"
                                    id="exampleInputText2"
                                    placeholder="Short Bio"
                                    name="aboutShort"
                                    value={this.state.edit.aboutShort}
                                    onChange={this.handleInputChange}
                                />

                                <label htmlFor="exampleInputText3">About</label>
                                <textarea
                                    className="form-control mb-3"
                                    id="exampleInputText3"
                                    placeholder="About"
                                    name="about"
                                    rows="5"
                                    value={this.state.edit.about}
                                    onChange={this.handleInputChange}
                                />

                                <label htmlFor="exampleInputText4">Picture</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    id="exampleInputText4"
                                    placeholder="Picture URL"
                                    name="avatarUrl"
                                    value={this.state.edit.avatarUrl}
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
                </div>
            </main>
        );
    }
}

export default ProfilePage;