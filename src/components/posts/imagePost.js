import React from "react";
import moment from "moment";

import { dataService } from "../services/serviceData";

class ImagePost extends React.Component {
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
        this.loadPost(this.props.post);
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadPost(id) {
        dataService.getImagePost(id, imagePost => this.setState({ post: imagePost }), error => this.handleNetworkRequestError(error));
    }

    render() {
        const { _id, _imageUrl, _dateCreated, _userDisplayName, _type, _commentsNum } = this.state.post;
        const postDate = moment(_dateCreated).fromNow();

        return (
            <div className={this.props.show}>
                <p className="error">{this.state.error}</p>
                <h5>{_userDisplayName}</h5>
                <img src={_imageUrl} />
                <small>{_type} post</small>
                <small>{_commentsNum} Comments</small>
                <small>{postDate}</small>
            </div>
        );
    }
}

export default ImagePost;