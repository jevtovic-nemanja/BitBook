import React from "react";

import { dataService } from "../services/serviceData";
import { redirect } from "../services/serviceRedirect";

class ProfilePage extends React.Component {
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
            edit: {
                name: "",
                email: "",
                aboutShort: "",
                about: "",
                avatarUrl: "",
            },
            show: "hide",
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
            return prevState;
        });
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            alert("There is no response from server.");
        }
    }

    getProfile() {
        dataService.getProfile(profile => this.loadProfile(profile)),
        error => this.handleNetworkRequestError(error);
    }

    loadProfile(profile) {
        this.setState({
            profile: profile,
            edit: {
                name: profile._name,
                email: profile._email,
                aboutShort: profile._bio,
                about: profile._about,
                avatarUrl: profile._picture
            }
        });
    }


    toggleModalShow(event) {
        event.preventDefault();

        if (this.state.show === "hide") {
            this.setState({ show: "" });
        } else {
            this.setState({ show: "hide" });
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
        }
        else {
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
            redirect("/");
        }
    }

    render() {

        let { _name, _email, _bio, _about, _picture, _noOfPosts, _noOfComments } = this.state.profile;
        var { name, email, aboutShort, about, avatarUrl } = this.state.edit;
        let { show, error } = this.state;

        return (
            <div>
                <div>
                    <div>
                        <button className="btn btn-outline-success my-2 my-sm-0 edit" onClick={this.toggleModalShow} >Edit Profile</button>
                    </div>
                    <div className="profilecontent">
                        <img src={_picture} className="profileimage" />
                        <h1 className="profilename">{_name}</h1>
                        <p className="profileabout">{_bio}</p>
                        <p className="profileabout">{_about}</p>
                        <div className="profilecounter">{_noOfPosts}</div>
                        <div className="profilecounter">{_noOfComments}</div>
                    </div>
                </div>

                <div className={show}>
                    <div className="backdropStyle" >
                        <div className="modalStyle">
                            <div className="editForm">
                                <form>
                                    <label htmlFor="exampleInputText1">Name</label>
                                    <input
                                        type="text"
                                        className="form-control modalInput"
                                        id="exampleInputText1"
                                        placeholder="Name"
                                        name="name"
                                        value={name}
                                        onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputEmail1">Contact Email</label>
                                    <input
                                        type="email"
                                        className="form-control modalInput"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleInputChange}
                                    />
                                    <small id="emailHelp" className="form-text text-muted modalInput">We will never share your email with anyone else.</small>

                                    <label htmlFor="exampleInputText2">Bio</label>
                                    <textarea
                                        className="form-control modalInput"
                                        id="exampleInputText2"
                                        placeholder="Short Bio"
                                        name="aboutShort"
                                        value={aboutShort}
                                        onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputText3">About</label>
                                    <textarea
                                        className="form-control modalInput"
                                        id="exampleInputText3"
                                        placeholder="About"
                                        name="about"
                                        rows="10"
                                        value={about}
                                        onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputText4">Picture</label>
                                    <input
                                        type="text"
                                        className="form-control modalInput"
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
                                <button className="btn btn-outline-success my-2 my-sm-0 saveButtonStyle" onClick={this.updateProfile}>
                                    Save
                                </button>
                                <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.toggleModalShow}>
                                    Close
                                </button>
                            </div>
                        </div >
                    </div >
                </div >
            </div>
        );
    }
}

export default ProfilePage;