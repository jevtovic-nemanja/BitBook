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
    }

    initState() {
        return {
            posts: [],
            error: ""
        };
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

    render() {
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
            </main>
        );
    }
}

export default FeedPage;