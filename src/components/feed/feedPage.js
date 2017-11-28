import React from "react";

import { dataService } from "../services/serviceData";
import { storageService } from "../services/serviceStorage";
import { USER_ID } from "../../constants";

import TextPost from "../posts/textPost";
import ImagePost from "../posts/imagePost";
import VideoPost from "../posts/videoPost";

class FeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            posts: [],
            error: "",
            show: "hide"
        };
    }

    bindEventHandlers() {
        this.toggleModalShow = this.toggleModalShow.bind(this);
    }

    componentDidMount() {
        this.getUserId();
        this.getPosts();
    }

    getPosts() {
        dataService.getPosts(posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));
    }

    getUserId() {
        dataService.getProfile(profile => storageService.setStorageItem(USER_ID, profile.userId),
            error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    renderPosts(post) {
        if (post._type === "text") {
            return <TextPost post={post._id} key={post._id} />;
        } else if (post._type === "image") {
            return <ImagePost post={post._id} key={post._id} />;
        } else if (post._type === "video") {
            return <VideoPost post={post._id} key={post._id} />;
        }
    }

    toggleModalShow() {
        event.preventDefault();

        if (this.state.show === "hide") {
            this.setState({ show: "" });
        } else {
            this.setState({ show: "hide" });
        }
    }

    render() {
        const { show, error } = this.state;

        if (this.state.posts.length < 1) {
            return (
                <main className="container">
                    <h1 className="text-center">Loading posts...</h1>
                </main>
            );
        }

        return (
            <main className="container">
                <p className="error">{this.state.error}</p>
                {this.state.posts.map(post => this.renderPosts(post))}

                <button className="buttonDark round" onClick={this.toggleModalShow}><p>+</p></button>

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
                                        // value={name}
                                        // onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputEmail1">Contact Email</label>
                                    <input
                                        type="email"
                                        className="form-control modalInput"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        name="email"
                                        // value={email}
                                        // onChange={this.handleInputChange}
                                    />
                                    <small id="emailHelp" className="form-text text-muted modalInput">We will never share your email with anyone else.</small>

                                    <label htmlFor="exampleInputText2">Bio</label>
                                    <textarea
                                        className="form-control modalInput"
                                        id="exampleInputText2"
                                        placeholder="Short Bio"
                                        name="aboutShort"
                                        // value={aboutShort}
                                        // onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputText3">About</label>
                                    <textarea
                                        className="form-control modalInput"
                                        id="exampleInputText3"
                                        placeholder="About"
                                        name="about"
                                        rows="5"
                                        // value={about}
                                        // onChange={this.handleInputChange}
                                    />

                                    <label htmlFor="exampleInputText4">Picture</label>
                                    <input
                                        type="text"
                                        className="form-control modalInput"
                                        id="exampleInputText4"
                                        placeholder="Picture URL"
                                        name="avatarUrl"
                                        // value={avatarUrl}
                                        // onChange={this.handleInputChange}
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
                        </div >
                    </div >
                </div >
            </main>
        );
    }
}

export default FeedPage;