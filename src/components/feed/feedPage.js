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
            networkError: "",
            error: "",
            modal: "hide",
            show: {
                text: "",
                image: "hide",
                video: "hide"
            },
            new: {
                textPostContent: "",
                imagePostContent: "",
                videoPostContent: ""
            },
            filterTitle: "All Posts",
            filter: {
                text: "",
                image: "",
                video: ""
            }
        };
    }

    bindEventHandlers() {
        this.toggleModalShow = this.toggleModalShow.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.selectPostType = this.selectPostType.bind(this);
        this.sendTextPost = this.sendTextPost.bind(this);
        this.sendImagePost = this.sendImagePost.bind(this);
        this.sendVideoPost = this.sendVideoPost.bind(this);
        this.filterPosts = this.filterPosts.bind(this);
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

    filterPosts(event) {
        event.preventDefault();
        const type = event.target.value;

        const showTextPosts = type === "Text" || type === "All Posts" ? "" : "hide";
        const showImagePosts = type === "Images" || type === "All Posts" ? "" : "hide";
        const showVideoPosts = type === "Videos" || type === "All Posts" ? "" : "hide";

        this.setState({
            filterTitle: type,
            filter: {
                text: showTextPosts,
                image: showImagePosts,
                video: showVideoPosts
            }
        });
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => {
            prevState.new[name] = value;
            prevState.error = "";
            return prevState;
        });
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ networkError: "There is no response from server." });
        }
    }

    jumpToTop() {
        this.setState({ error: "" });
        this.toggleModalShow();
        scrollTo(0, 0);
    }

    renderPosts(post) {
        const { text, image, video } = this.state.filter;

        if (post._type === "text") {
            return <TextPost post={post._id} key={post._id} show={text} />;
        } else if (post._type === "image") {
            return <ImagePost post={post._id} key={post._id} show={image} />;
        } else if (post._type === "video") {
            return <VideoPost post={post._id} key={post._id} show={video} />;
        }
    }

    selectPostType(event) {
        event.preventDefault();

        const type = event.target.value;

        const showText = type === "text" ? "" : "hide";
        const showImage = type === "image" ? "" : "hide";
        const showVideo = type === "video" ? "" : "hide";

        if (this.state.show[type] === "hide") {
            this.setState({
                show: {
                    text: showText,
                    image: showImage,
                    video: showVideo
                }
            });
        }
    }

    sendTextPost(event) {
        event.preventDefault();

        const isValid = this.validateTextInput();

        if (isValid) {
            const postData = { text: this.state.new.textPostContent };

            dataService.postTextPost(postData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));

            this.jumpToTop();
        }
    }

    sendImagePost(event) {
        event.preventDefault();

        const isValid = this.validateImageInput();
        console.log(isValid);

        if (isValid) {
            const postData = { imageUrl: this.state.new.imagePostContent };

            dataService.postImagePost(postData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));

            this.jumpToTop();
        }
    }

    sendVideoPost(event) {
        event.preventDefault();

        const isValid = this.validateVideoInput();

        if (isValid) {
            const videoUrl = this.state.new.videoPostContent.replace("watch?v=", "embed/");

            const postData = { videoUrl: videoUrl };

            dataService.postVideoPost(postData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));

            this.jumpToTop();
        }
    }

    toggleModalShow() {
        event.preventDefault();

        if (this.state.modal === "hide") {
            this.setState({ modal: "" });
        } else {
            this.setState({ modal: "hide" });
        }
    }

    validateTextInput() {
        const text = this.state.new.textPostContent;

        if (!text) {
            this.setState({ error: "Please enter some text." });
            return false;
        } else {
            return true;
        }
    }

    validateImageInput() {
        const imageUrl = this.state.new.imagePostContent;

        if (!imageUrl) {
            this.setState({ error: "Please enter image URL." });
            return false;
        } else if (!imageUrl.includes("http://") && !imageUrl.includes("https://")) {
            this.setState({ error: "Image URL is invalid!" });
            return false;
        } else {
            return true;
        }
    }

    validateVideoInput() {
        const videoUrl = this.state.new.videoPostContent;

        if (!videoUrl) {
            this.setState({ error: "Please enter video URL." });
            return false;
        } else if (!videoUrl.includes("http://www.youtube.com/") && !videoUrl.includes("https://www.youtube.com/")) {
            this.setState({ error: "Input must be YouTube video URL!" });
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { show, error, modal, filterTitle } = this.state;
        const { textPostContent, imagePostContent, videoPostContent } = this.state.new;

        if (this.state.posts.length < 1) {
            return (
                <main className="container">
                    <h1 className="text-center">Loading posts...</h1>
                </main>
            );
        }

        return (
            <main className="container">
                <p className="error">{this.state.networkError}</p>

                <div className="btn-group">
                    <button type="button" className="btn buttonDark">{filterTitle}</button>
                    <button type="button" className="btn buttonDark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" value="All Posts" onClick={this.filterPosts}>All Posts</button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" value="Videos" onClick={this.filterPosts}>Videos</button>
                        <button className="dropdown-item" value="Images" onClick={this.filterPosts}>Images</button>
                        <button className="dropdown-item" value="Text" onClick={this.filterPosts}>Text</button>
                    </div>
                </div>

                {this.state.posts.map(post => this.renderPosts(post))}

                <button className="buttonDark round" onClick={this.toggleModalShow}><p>+</p></button>

                <div className={modal}>
                    <div className="backdropStyle" >
                        <div className="modalStyle">
                            <div className={show.text}>
                                <h2>New Post</h2>
                                <form>
                                    <label htmlFor="exampleInputText1"><small>Post content</small></label>
                                    <input
                                        type="text"
                                        className="form-control modalInput"
                                        id="exampleInputText1"
                                        placeholder="Name"
                                        name="textPostContent"
                                        value={textPostContent}
                                        onChange={this.handleInputChange}
                                    />
                                </form>
                                <div>
                                    <button className="btn buttonLight my-2 my-sm-0 saveButtonStyle" onClick={this.sendTextPost}>
                                        Post
                                    </button>
                                    <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.toggleModalShow}>
                                        Close
                                    </button>
                                </div>
                            </div>

                            <div className={show.image}>
                                <h2>New Image Post</h2>
                                <form>
                                    <label htmlFor="exampleInputText1"><small>Image Link</small></label>
                                    <input
                                        type="text"
                                        className="form-control modalInput"
                                        id="exampleInputText1"
                                        placeholder="Name"
                                        name="imagePostContent"
                                        value={imagePostContent}
                                        onChange={this.handleInputChange}
                                    />
                                </form>
                                <div>
                                    <button className="btn buttonLight my-2 my-sm-0 saveButtonStyle" onClick={this.sendImagePost}>
                                        Post
                                    </button>
                                    <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.toggleModalShow}>
                                        Close
                                    </button>
                                </div>
                            </div>

                            <div className={show.video}>
                                <h2>New Video Post</h2>
                                <form>
                                    <label htmlFor="exampleInputText1"><small>YouTube Video Link</small></label>
                                    <input
                                        type="text"
                                        className="form-control modalInput"
                                        id="exampleInputText1"
                                        placeholder="Name"
                                        name="videoPostContent"
                                        value={videoPostContent}
                                        onChange={this.handleInputChange}
                                    />
                                </form>
                                <div>
                                    <button className="btn buttonLight my-2 my-sm-0 saveButtonStyle" onClick={this.sendVideoPost}>
                                        Post
                                    </button>
                                    <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.toggleModalShow}>
                                        Close
                                    </button>
                                </div>
                            </div>

                            <div className="error">
                                {error
                                    ? <p>{error}</p>
                                    : <p></p>
                                }
                            </div>

                        </div >
                        <button className="buttonLight round" value="text" onClick={this.selectPostType}>T</button><p>Text</p>
                        <button className="buttonLight round" value="image" onClick={this.selectPostType}>I</button><p>Image</p>
                        <button className="buttonLight round" value="video" onClick={this.selectPostType}>V</button><p>Video</p>

                    </div >

                </div >
            </main>
        );
    }
}

export default FeedPage;