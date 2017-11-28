import React from "react";

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
        const { _id, _videoUrl, _type, _commentsNum } = this.state.post;

        return (
            <div>
                <p className="error">{this.state.error}</p>
                <iframe width="560" height="315" src={_videoUrl} frameBorder="0" allowFullScreen></iframe>
                <small>{_type}</small>
                <small>{_commentsNum} Comments</small>
            </div>
        );
    }
}

export default VideoPost;