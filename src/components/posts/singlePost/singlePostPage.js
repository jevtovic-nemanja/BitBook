import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { dataService } from "../../services/serviceData";

import { TextPost } from "../textPost";
import { ImagePost } from "../imagePost";
import { VideoPost } from "../videoPost";
import { Comment } from "../singlePost/comment";
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

    getPost(type, id) {
        if (type === "text") {
            dataService.getTextPost(parseInt(id), post => {
                this.setState({ post: post });
                this.getComments(post._id);
            }, error => this.handleNetworkRequestError(error));
        } else if (type === "image") {
            dataService.getImagePost(parseInt(id), post => {
                this.setState({ post: post });
                this.getComments(post._id);
            }, error => this.handleNetworkRequestError(error));
        } else if (type === "video") {
            dataService.getVideoPost(parseInt(id), post => {
                this.setState({ post: post });
                this.getComments(post._id);
            }, error => this.handleNetworkRequestError(error));
        }
    }

    getComments(id) {
        dataService.getComments(id, comments => {
            this.setState({ comments: comments });
            this.getUserImages();
        }, error => this.cannotLoadComments(error));
    }

    getUserImages() {
        this.state.comments.map(comment => {
            dataService.getUserProfile(comment._authorId, profile => this.setState(oldState => {
                oldState.userImages.push(profile._avatarUrl);
                return oldState;
            }), error => this.setState(oldState => {
                oldState.userImages.push("http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg");
                return oldState;
            }));
        });
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    cannotLoadComments(error) {
        if (error.request) {
            this.setState({ commentsError: "Cannot load comments." });
        }
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

    renderComment(comment) {
        const id = comment._userId;
        const userImages = this.state.userImages.map(image => image);
        const image = userImages[this.state.userImageCounter];

        return <Comment key={comment._id} comment={comment} image={image} />;
    }

    render() {
        const { validationError, commentsError } = this.state;
        const { _text, _id, _userDisplayName, _userId, _commentsNum, _dateCreated } = this.state.post;
        const postDate = moment(_dateCreated).fromNow();

        return (
            <div className="mb-4 mt-4">
                {this.renderPost(this.state.post)}

                <AddComment onPostComment={this.postComment} />

                {this.state.comments.map(comment => this.renderComment(comment))}

            </div>
        );
    }
}

export default SinglePostPage;