import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { dataService } from "../../services/serviceData";
import Comment from "../singlePost/comment";

class SingleTextPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            post: "",
            comments: [],
            error: "",
            commentsError: ""
        };
    }

    componentDidMount() {
        this.getPost(this.props.match.params.id);
    }

    getPost(id) {
        dataService.getTextPost(id, textPost => {
            this.setState({ post: textPost });
            this.getComments(textPost._id);
        }, error => this.handleNetworkRequestError(error));
    }

    getComments(id) {
        dataService.getComments(id, comments => this.setState({ comments: comments }), error => this.handleCommentsNetworkRequestError(error));
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

    render() {
        const { error, commentsError } = this.state;
        const { _text, _id, _userDisplayName, _userId, _commentsNum, _dateCreated } = this.state.post;
        const postDate = moment(_dateCreated).fromNow();

        return (
            <div className="row">
                <p className="error">{error}</p>
                <div className="card mb-4" style={{ width: 100 + "%" }} >
                    <div className="card-body">
                        <Link to={`/people/${_userId}`} ><h5>{_userDisplayName}</h5></Link>
                        <p> {_text}</p>
                        <small>{postDate}</small>
                        <h6 className="float-right">{_commentsNum} Comments</h6>
                    </div>
                </div>
                <p className="error">{commentsError}</p>
                {this.state.comments.map(comment => {
                    return <Comment comment={comment} key={comment._id} />;
                })}
            </div>
        );
    }
}

export default SingleTextPost;