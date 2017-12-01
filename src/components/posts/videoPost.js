import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export const VideoPost = props => {
    const { _id, _videoUrl, _dateCreated, _userId, _userDisplayName, _type, _commentsNum } = props.post;
    const { error } = props.error;
    const postDate = moment(_dateCreated).fromNow();

    if (error) {
        return (
            <div className={props.show}>
                <div className="card" style={{ width: 100 + "%" }} >
                    <div className="card-body">
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={props.show}>
            <div className="card mb-4" >
                <div className="embed-responsive embed-responsive-16by9" >
                    <iframe src={_videoUrl} style={{ width: 100 + "%" }} frameBorder="0" allowFullScreen className="card-img-top embed-responsive-item"></iframe>
                </div>
                <div className="card-body" >
                    <Link to={`/people/${_userId}`} ><h5>{_userDisplayName}</h5></Link>
                    <small>{postDate}</small>
                    <Link to={`/posts/video/${_id}`} ><h6 className="float-right">{_commentsNum} Comments</h6></Link>
                </div>
            </div>
        </div>
    );
};