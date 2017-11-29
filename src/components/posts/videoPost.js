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

    calculateHeight(width) {
        
    }

    render() {
        const { _id, _videoUrl, _dateCreated, _userDisplayName, _type, _commentsNum } = this.state.post;
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
                    <div className="card-body" >
                        <iframe src={_videoUrl} style={{width: 100 + "%"}} frameBorder="0" allowFullScreen className="card-img-top"></iframe>
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