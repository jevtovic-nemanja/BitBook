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
                <div className="card" style={{ width: 50 + "rem", height: 37 + "rem" }} >
                    <img style={{ width: 50 + "rem", height: 30 + "rem" }} src={_imageUrl} className="card-img-top" />
                    <div className="card-body">
                        <h5>{_userDisplayName}</h5>
                        <small>{postDate}</small>
                        <small className="float-right">{_commentsNum} Comments</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImagePost;







