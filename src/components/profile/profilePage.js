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
                name: "",
                email: "",
                bio: "",
                about: "",
                picture: "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg",
                noOfPosts: 0,
                noOfComments: 0
            },
            show: "hide"
        };
    }

    bindEventHandlers() {
        this.toggleModalShow = this.toggleModalShow.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.loadProfile();
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            alert("There is no response from server.");
        }
    }

    loadProfile() {
        dataService.getProfile(profileDTO => this.setState({ profile: profileDTO }),
            error => this.handleNetworkRequestError(error));
    }

    toggleModalShow(event) {
        event.preventDefault();

        if (this.state.show === "hide") {
            this.setState({ show: "" });
        } else {
            this.setState({ show: "hide" });
        }
    }

    updateProfile() {

    }

    render() {
        const { name, email, bio, about, picture, noOfPosts, noOfComments } = this.state.profile;
        const { show } = this.state;


        console.log(this.state);

        return (
            <div>
                <div>
                    <div>
                        <button className="btn btn-outline-success my-2 my-sm-0 edit" onClick={this.toggleModalShow} >Edit Profile</button>
                    </div>
                    <div className="profilecontent">
                        <img src={picture} className="profileimage" />
                        <h1 className="profilename">{name}</h1>
                        <p className="profileabout">{bio}</p>
                        <p className="profileabout">{about}</p>
                        <div className="profilecounter">{noOfPosts}</div>
                        <div className="profilecounter">{noOfComments}</div>
                    </div>
                </div>

                <div className={show} >
                    <div className="backdropStyle" >
                        <div className="modalStyle">
                            <div className="editForm">
                                <form>
                                    <label htmlFor="exampleInputText1">Name</label>
                                    <input type="text" className="form-control modalInput" id="exampleInputText1" placeholder="Name" name="name" value={name} onChange={this.handleInputChange} />
                                    <label htmlFor="exampleInputEmail1">Contact Email</label>
                                    <input type="email" className="form-control modalInput" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={this.handleInputChange} />
                                    <small id="emailHelp" className="form-text text-muted modalInput">We will never share your email with anyone else.</small>
                                    <label htmlFor="exampleInputText2">Bio</label>
                                    <textarea className="form-control modalInput" id="exampleInputText2" placeholder="Short Bio" name="bio" value={bio} onChange={this.handleInputChange} />
                                    <label htmlFor="exampleInputText3">About</label>
                                    <textarea className="form-control modalInput" id="exampleInputText3" placeholder="About" name="about" rows="10" value={about} onChange={this.handleInputChange} />
                                    <label htmlFor="exampleInputText4">Picture</label>
                                    <input type="text" className="form-control modalInput" id="exampleInputText4" placeholder="Picture URL" name="picture" value={picture} onChange={this.handleInputChange} />
                                </form>
                            </div>
                            <div>
                                <button className="btn btn-outline-success my-2 my-sm-0 saveButtonStyle" onClick={this.modalSave}>
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