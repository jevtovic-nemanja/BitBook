import React from "react";

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
        this.loadPost(this.props.post);
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
        const { _id, _text, _type, _commentsNum } = this.state.post;

        return (
            <div>
                <p className="error">{this.state.error}</p>
                <p>{_text}</p>
                <small>{_type} post</small>
                <small>{_commentsNum} Comments</small>
            </div>
        );
    }
}

export default TextPost;