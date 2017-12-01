import React from "react";
import moment from "moment";
import { dataService } from "../../services/serviceData";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            userImage: "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg"
        };
    }

    componentDidMount() {
        const id = this.props.comment.authorId;
        this.getUserImage(id);
    }

    getUserImage(id) {
        dataService.getUserProfile(id, profile => this.setState({userImage: profile.avatarUrl}));
    }

    render() {
        const { body, dateCreated, authorName } = this.props.comment;
        const postDate = moment(dateCreated).fromNow();

        return (
            <div className="card mt-4 w-100" style={{ height: 120 + "px" }} >
                <div className="card-body row pt-2 pb-2">
                    <div className="col-2 h-100 mt-2 text-center">
                        <img src={this.state.userImage} className="w-50 rounded-circle my-auto" style={{width: 62 + "px", height: 62 + "px"}} />
                        <p>{authorName}</p>
                    </div>
                    <div className="col-10 h-100 my-auto pt-3">
                        <p className="text-justify">{body}</p>
                        <small className="float-right">{postDate}</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;