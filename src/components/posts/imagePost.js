import React from "react";
import moment from "moment";

import { dataService } from "../services/serviceData";
import { Link } from "react-router-dom";

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
        this.loadPost(this.props.post._id);
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
        const { _id, _imageUrl, _dateCreated, _userId, _userDisplayName, _type, _commentsNum } = this.state.post;
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
                <div className="card mb-4" style={{ width: 100 + "%", height: 100 + "%" }} >
                    <img src={_imageUrl} className="card-img-top" />
                    <div className="card-body">
                        <Link to={`people/${_userId}`} ><h5>{_userDisplayName}</h5></Link>
                        <small>{postDate}</small>
                        <small className="float-right">{_commentsNum} Comments</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImagePost;







