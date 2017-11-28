import React from "react";

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
        const { _id, _imageUrl, _type, _commentsNum } = this.state.post;

        return (
            <div>
                <p className="error">{this.state.error}</p>
                <img src={_imageUrl} />
                <small>{_type}</small>
                <small>{_commentsNum} Comments</small>
            </div>
        );
    }
}

export default ImagePost;