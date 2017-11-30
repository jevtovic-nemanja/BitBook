import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { dataService } from "../../services/serviceData";

class SingleImagePost extends React.Component {
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
        this.getPost(this.props.match.params.id);
    }

    getPost(id) {
        dataService.getImagePost(id, imagePost => this.setState({ post: imagePost }), error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    render() {
        const { error } = this.state;
        const { _imageUrl, _userDisplayName, _userId, _commentsNum, _dateCreated } = this.state.post;
        const postDate = moment(_dateCreated).fromNow();

        return (
            <div className="card mb-4" style={{ width: 100 + "%", height: 100 + "%" }} >
                <img src={_imageUrl} className="card-img-top" />
                <div className="card-body">
                    <Link to={`/people/${_userId}`} ><h5>{_userDisplayName}</h5></Link>
                    <small>{postDate}</small>
                    <h6 className="float-right">{_commentsNum} Comments</h6>
                </div>
            </div>
        );
    }
}

export default SingleImagePost;