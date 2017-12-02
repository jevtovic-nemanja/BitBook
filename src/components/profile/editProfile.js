import React from "react";

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            edit: this.props.edit,
            validationError: ""
        };
    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => {
            prevState.edit[name] = value;
            prevState.validationError = "";
            return prevState;
        });
    }

    updateProfile(event) {
        event.preventDefault();
        const isValid = this.validateInput();
 
        if (isValid) {
            const dataObject = this.state.edit;
            this.props.updateProfile(dataObject);
            this.props.toggleModal();
        }
    }

    validateInput() {
        const { name, email, aboutShort, about, avatarUrl } = this.state.edit;

        if (!name) {
            this.setState({ validationError: "Please enter a name." });
            return false;
        } else if (!email) {
            this.setState({ validationError: "Please enter an email address." });
            return false;
        } else if (!email.includes("@")) {
            this.setState({ validationError: "A valid email address contains \"@\"." });
            return false;
        } else if (!aboutShort) {
            this.setState({ validationError: "Please enter a short bio." });
            return false;
        } else if (!about) {
            this.setState({ validationError: "Please enter something about yourself." });
            return false;
        } else if (!avatarUrl) {
            this.setState({ validationError: "Please set your profile picture." });
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { name, email, aboutShort, about, avatarUrl } = this.state.edit;
        const { validationError } = this.state;

        return (
            <div>
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
                    {validationError
                        ? <p>{validationError}</p>
                        : <p></p>
                    }
                </div>
                
                <div>
                    <button className="btn buttonLight my-2 my-sm-0 saveButtonStyle" onClick={this.updateProfile}>
                        Save
                    </button>
                    <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.props.toggleModal}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}

export default EditProfile;