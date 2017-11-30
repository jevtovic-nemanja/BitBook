import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { dataService } from "../services/serviceData";

class VideoPost extends React.Component {
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
        dataService.getVideoPost(id, videoPost => this.setState({ post: videoPost }), error => this.handleNetworkRequestError(error));
    }

    calculateHeight(width) {

    }

    render() {
        const { _id, _videoUrl, _dateCreated, _userId, _userDisplayName, _type, _commentsNum } = this.state.post;
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
                <div className="card mb-4" >
                    <div className="embed-responsive embed-responsive-16by9" >
                        <iframe src={_videoUrl} style={{ width: 100 + "%" }} frameBorder="0" allowFullScreen className="card-img-top embed-responsive-item"></iframe>
                    </div>
                    <div className="card-body" >
                        <Link to={`people/${_userId}`} ><h5>{_userDisplayName}</h5></Link>
                        <small>{postDate}</small>
                        <small className="float-right">{_commentsNum} Comments</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPost;