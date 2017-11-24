import React from "react";

import { dataService } from "../services/serviceData";

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
                editName: "",
                editEmail: "",
                editBio: "",
                editAbout: "",
                editPicture: "",
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
        this.loadProfile();
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

    loadProfile() {
        dataService.getProfile(profile => {
            this.setState({
                profile: profile,
                edit: {
                    editName: profile._name,
                    editEmail: profile._email,
                    editBio: profile._bio,
                    editAbout: profile._about,
                    editPicture: profile._picture
                }
            });
        }),
        error => this.handleNetworkRequestError(error);
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
        const { editName, editEmail, editBio, editAbout, editPicture } = this.state.edit;

        if (!editName) {
            this.setState({ error: "Please enter a name." });
            return false;
        } else if (!editEmail) {
            this.setState({ error: "Please enter an email address." });
            return false;
        } else if (!editEmail.includes("@")) {
            this.setState({ error: "A valid email address contains \"@\"." });
            return false;
        } else if (!editBio) {
            this.setState({ error: "Please enter a short bio." });
            return false;
        } else if (!editAbout) {
            this.setState({ error: "Please enter something about yourself." });
            return false;
        } else if (!editPicture) {
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

        if (isValid) {
            

        }

    }

    render() {

        let { _name, _email, _bio, _about, _picture, _noOfPosts, _noOfComments } = this.state.profile;
        var { editName, editEmail, editBio, editAbout, editPicture } = this.state.edit;
        let { show, error } = this.state;

        console.log(this.state);

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
                                        name="editName"
                                        value={editName}
                                        onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputEmail1">Contact Email</label>
                                    <input
                                        type="email"
                                        className="form-control modalInput"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        name="editEmail"
                                        value={editEmail}
                                        onChange={this.handleInputChange}
                                    />
                                    <small id="emailHelp" className="form-text text-muted modalInput">We will never share your email with anyone else.</small>

                                    <label htmlFor="exampleInputText2">Bio</label>
                                    <textarea
                                        className="form-control modalInput"
                                        id="exampleInputText2"
                                        placeholder="Short Bio"
                                        name="editBio"
                                        value={editBio}
                                        onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputText3">About</label>
                                    <textarea
                                        className="form-control modalInput"
                                        id="exampleInputText3"
                                        placeholder="About"
                                        name="editAbout"
                                        rows="10"
                                        value={editAbout}
                                        onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputText4">Picture</label>
                                    <input
                                        type="text"
                                        className="form-control modalInput"
                                        id="exampleInputText4"
                                        placeholder="Picture URL"
                                        name="editPicture"
                                        value={editPicture}
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