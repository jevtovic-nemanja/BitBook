import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { dataService } from "../services/serviceData";

class TextPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            post: "",
            error: ""
        };
    }

    componentDidMount() {
        this.loadPost(this.props.post._id);
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadPost(id) {
        dataService.getTextPost(id, textPost => this.setState({ post: textPost }), error => this.handleNetworkRequestError(error));
    }

    render() {
        const { _id, _text, _dateCreated, _userId, _userDisplayName, _type, _commentsNum } = this.state.post;
        const { error } = this.state;
        const postDate = moment(_dateCreated).fromNow();

        if (error) {
            return (
                <div className={this.props.show}>
                    <div className="card" style={{ width: 100 + "%" }} >
                        <div className="card-body">
                            <p>{error}</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={this.props.show}>
                <div className="card mb-4" style={{ width: 100 + "%" }} >
                    <div className="card-body">
                        <Link to={`/people/${_userId}`} ><h5>{_userDisplayName}</h5></Link>
                        <p> {_text}</p>
                        <small>{postDate}</small>
                        <Link to={`/textPosts/${_id}`} ><h6 className="float-right">{_commentsNum} Comments</h6></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default TextPost;