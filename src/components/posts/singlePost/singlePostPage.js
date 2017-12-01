import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { dataService } from "../../services/serviceData";

import { TextPost } from "../textPost";
import { ImagePost } from "../imagePost";
import { VideoPost } from "../videoPost";
import Comment from "../singlePost/comment";
import AddComment from "../singlePost/addComment";

class SinglePostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            post: "",
            comments: [],
            commentsError: "",
            userImages: [],
            userImageCounter: 0
        };
    }

    bindEventHandlers() {
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id);
        const type = this.props.match.params.type;
        this.getPost(type, id);
    }

    cannotLoadComments(error) {
        if (error.request) {
            this.setState({ commentsError: "Cannot load comments." });
        }
    }

    getComments(id) {
        dataService.getComments(id, comments => {
            this.setState({ comments: comments });
        }, error => this.cannotLoadComments(error));
    }

    getPost(type, id, callback) {
        if (type === "text") {
            dataService.getTextPost(parseInt(id), post => this.loadPost(post), error => this.handleNetworkRequestError(error));
        } else if (type === "image") {
            dataService.getImagePost(parseInt(id), post => this.loadPost(post), error => this.handleNetworkRequestError(error));
        } else if (type === "video") {
            dataService.getVideoPost(parseInt(id), post => this.loadPost(post), error => this.handleNetworkRequestError(error));
        }
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadPost(post) {
        this.setState({ post: post });
        this.getComments(post._id);
    }

    postComment(commentData) {
        dataService.postComment(commentData, comments => this.setState({ comments: comments }), error => this.handleCommentsNetworkRequestError(error));
    }

    renderPost(post) {
        if (post._type === "text") {
            return <TextPost post={post} key={post._id} error={this.state.commentsError} />;
        } else if (post._type === "image") {
            return <ImagePost post={post} key={post._id} error={this.state.commentsError} />;
        } else if (post._type === "video") {
            return <VideoPost post={post} key={post._id} error={this.state.commentsError} />;
        }
    }

    render() {
        const { validationError, commentsError, userImages } = this.state;
        const { _text, _id, _userDisplayName, _userId, _commentsNum, _dateCreated } = this.state.post;
        const postDate = moment(_dateCreated).fromNow();

        return (
            <div className="mb-4 mt-4">
                {this.renderPost(this.state.post)}

                <AddComment onPostComment={this.postComment} id={_id} />

                {this.state.comments.map(comment => <Comment key={comment._id} comment={comment} />)}

            </div>
        );
    }
}

export default SinglePostPage;