import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { dataService } from "../../services/serviceData";

class SingleTextPost extends React.Component {
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
        dataService.getTextPost(id, textPost => this.setState({ post: textPost }), error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    render() {
        const { error } = this.state;
        const { _text, _userDisplayName, _userId, _commentsNum, _dateCreated } = this.state.post;
        const postDate = moment(_dateCreated).fromNow();

        return (
            <div className="row">
                <p>{error}</p>
                <div className="card mb-4" style={{ width: 100 + "%" }} >
                    <div className="card-body">
                        <Link to={`/people/${_userId}`} ><h5>{_userDisplayName}</h5></Link>
                        <p> {_text}</p>
                        <small>{postDate}</small>
                        <h6 className="float-right">{_commentsNum} Comments</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleTextPost;