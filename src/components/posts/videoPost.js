import React from "react";
import moment from "moment";

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
        this.loadPost(this.props.post);
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadPost(id) {
        dataService.getVideoPost(id, videoPost => this.setState({ post: videoPost }), error => this.handleNetworkRequestError(error));
    }

    render() {
        const { _id, _videoUrl, _dateCreated, _userDisplayName, _type, _commentsNum } = this.state.post;
        const postDate = moment(_dateCreated).fromNow();

        return (
            <div className={this.props.show}>
                <p className="error">{this.state.error}</p>
                <div className="card" style={{width: 50 + "rem", height: 30 + "rem"}} >
                    <iframe style={{width: 50 + "rem", height: 28 + "rem"}} src={_videoUrl} frameBorder="0" allowFullScreen className="card-img-top"></iframe>
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

export default VideoPost;