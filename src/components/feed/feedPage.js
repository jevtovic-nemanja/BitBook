import React from "react";

import { Link } from "react-router-dom";
import Modal from "react-modal";

import { USER_ID } from "../../constants";

import { dataService } from "../services/serviceData";
import { storageService } from "../services/serviceStorage";

import { TextPost } from "../posts/textPost";
import { ImagePost } from "../posts/imagePost";
import { VideoPost } from "../posts/videoPost";
import NewPost from "./newPost";
import FilterPosts from "./filterPosts";

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
            postError: "",
            error: "",
            modal: false,
            filter: {
                text: "",
                image: "",
                video: ""
            }
        };
    }

    bindEventHandlers() {
        this.deletePost = this.deletePost.bind(this);
        this.filterPosts = this.filterPosts.bind(this);
        this.sendPost = this.sendPost.bind(this);
        this.toggleModalShow = this.toggleModalShow.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {
        this.getUserId();
        this.getPosts();
    }

    cannotDeletePost(error) {
        if (error.request) {
            this.setState({ postError: "Unable to delete post." });
        }
    }

    cannotLoadPost(error) {
        if (error.request) {
            this.setState({ postError: "Unable to load post." });
        }
    }

    deletePost(id) {
        dataService.deletePost(id, response => this.getPosts(), error => this.cannotDeletePost(error));
    }

    filterPosts(type) {

        const showTextPosts = type === "Text" || type === "All Posts" ? "" : "hide";
        const showImagePosts = type === "Images" || type === "All Posts" ? "" : "hide";
        const showVideoPosts = type === "Videos" || type === "All Posts" ? "" : "hide";

        this.setState({
            filter: {
                text: showTextPosts,
                image: showImagePosts,
                video: showVideoPosts
            }
        });
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
            this.setState({ networkError: "There is no response from server." });
        }
    }

    jumpToTop() {
        this.setState({ validationError: "" });
        this.toggleModalShow();
        scrollTo(0, 0);
    }

    renderPosts(post) {
        const { text, image, video } = this.state.filter;
        const { postError } = this.state;

        const userId = parseInt(storageService.getStorageItem(USER_ID));
        let usersPost = "";

        if (userId === post.userId) {
            usersPost = true;
        } else {
            usersPost = false;
        }

        if (post.type === "text") {
            return <TextPost post={post} key={post.id} show={text} error={postError} usersPost={usersPost} deletePost={this.deletePost} />;
        } else if (post._type === "image") {
            return <ImagePost post={post} key={post.id} show={image} error={postError} usersPost={usersPost} deletePost={this.deletePost} />;
        } else if (post._type === "video") {
            return <VideoPost post={post} key={post.id} show={video} error={postError} usersPost={usersPost} deletePost={this.deletePost} />;
        }
    }

    sendPost(type, newData) {

        if (type === "text") {

            dataService.postTextPost(newData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));
            this.jumpToTop();

        } else if (type === "image") {

            dataService.postImagePost(newData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));
            this.jumpToTop();

        } else if (type === "video") {

            dataService.postVideoPost(newData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));
            this.jumpToTop();

        }
    }

    toggleModalShow() {
        event.preventDefault();

        if (this.state.modal === false) {
            this.setState({ modal: true });
        } else {
            this.setState({
                modal: false,
                error: ""
            });
        }
    }

    uploadImage(imageUrl) {
        const postData = {imageUrl: imageUrl};
        this.sendPost("image", postData);
    }

    getModalStyle() {
        if (screen.width < 579) {
            return {
                content: {
                    position: "absolute",
                    top: "10%",
                    left: "15%",
                    right: "15%",
                    bottom: "",
                    border: "0.5px solid rgba(43, 122, 120, 0.5)",
                    background: "#feffff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "20px"
                }
            };

        } else {
            return {
                content: {
                    position: "absolute",
                    top: "10%",
                    left: "15%",
                    right: "15%",
                    bottom: "",
                    border: "0.5px solid rgba(43, 122, 120, 0.5)",
                    background: "#feffff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "20px"
                }
            };
        };
    }

    render() {
        const { show, validationError, modal, filterTitle } = this.state;

        if (this.state.posts.length < 1) {
            return (
                <main className="row">
                    <h1 className="text-center mx-auto">Loading posts...</h1>
                </main>
            );
        }

        return (
            <main className="row mt-2">
                <div className="col-12 col-lg-9 offset-lg-1">

                    <FilterPosts filter={this.filterPosts} />

                    <p className="error">{this.state.networkError}</p>

                    {this.state.posts.map(post => this.renderPosts(post))}

                    <div className="row modalWrapper">

                        <Modal isOpen={modal} style={this.getModalStyle()} >
                            <NewPost sendPost={this.sendPost} toggleModal={this.toggleModalShow} error={this.state.error} uploadImage={this.uploadImage} />
                        </Modal >
                        
                    </div>
                </div>

                <div className="col-lg-2"></div>

                <button className="btn-block buttonDark round postButton" onClick={this.toggleModalShow}><p>+</p></button>

            </main >
        );
    }
}

export default FeedPage;