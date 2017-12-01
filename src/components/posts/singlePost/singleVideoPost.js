import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { dataService } from "../../services/serviceData";
import { Comment } from "../singlePost/comment";

class SingleVideoPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            post: "",
            error: "",
            comments: [],
            commentsError: "",
            newComment: "",
            userPicture: ""
        };
    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        this.getPost(this.props.match.params.id);
    }

    getPost(id) {
        dataService.getVideoPost(id, videoPost => {
            this.setState({ post: videoPost });
            this.getComments(videoPost._id);
            this.getUserPicture(videoPost._userId);
        }, error => this.handleNetworkRequestError(error));
    }

    getComments(id) {
        dataService.getComments(id, comments => this.setState({ comments: comments }), error => this.handleNetworkRequestError(error));
    }

    getUserPicture(id) {
        dataService.getUserProfile(id, profile => this.setState({ userPicture: profile._avatarUrl }), error => this.setState({ userPicture: "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg" }));
    }

    handleInputChange(event) {
        event.preventDefault();

        const value = event.target.value;

        this.setState({ newComment: value });
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    handleCommentsNetworkRequestError(error) {
        if (error.request) {
            this.setState({ commentsError: "Cannot load comments." });
        }
    }

    postComment(event) {
        event.preventDefault();

        const isValid = this.validateInput();

        if (isValid) {
            const postId = this.state.post._id;

            const postData = { postId: postId, body: this.state.newComment };
            dataService.postComment(postData, comments => this.setState({ comments: comments }), error => this.handleCommentsNetworkRequestError(error));
        }
    }

    validateInput() {
        if (!this.state.newComment) {
            this.setState({ commentsError: "Please enter some text." });
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { error, commentsError, userPicture } = this.state;
        const { _videoUrl, _id, _userDisplayName, _userId, _commentsNum, _dateCreated } = this.state.post;
        const postDate = moment(_dateCreated).fromNow();

        return (
            <div className="mb-4">
                <p className="error">{error}</p>
                <div className="card mb-4 " >
                    <div className="embed-responsive embed-responsive-16by9" >
                        <iframe src={_videoUrl} style={{ width: 100 + "%" }} frameBorder="0" allowFullScreen className="card-img-top embed-responsive-item"></iframe>
                    </div>
                    <div className="card-body" >
                        <Link to={`/people/${_userId}`} ><h5>{_userDisplayName}</h5></Link>
                        <small>{postDate}</small>
                        <h6 className="float-right">{_commentsNum} Comments</h6>
                    </div>
                </div>

                <form className="mt-4 mb-4">
                    <input type="text" placeholder="Add your comment..." value={this.state.newComment} onChange={this.handleInputChange} />
                    <button onClick={this.postComment} >Send</button>
                </form>

                <p className="error">{commentsError}</p>
                {this.state.comments.map(comment => {
                    return <Comment key={comment._id} author={comment._authorName} body={comment._body} image={userPicture} date={comment._dateCreated} />;
                })}
            </div>
        );
    }
}

export default SingleVideoPost;