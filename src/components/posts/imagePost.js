import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export const ImagePost = props => {
    const { id, imageUrl, dateCreated, userId, userDisplayName, type, commentsNum } = props.post;
    const { error } = props.error;
    const postDate = moment(dateCreated).fromNow();

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
            <div className="card mb-4" style={{ width: 100 + "%", height: 100 + "%" }} >
                <img src={imageUrl} className="card-img-top" />
                <div className="card-body">
                    <Link to={`/people/${userId}`} ><h5>{userDisplayName}</h5></Link>
                    <small>{postDate}</small>
                    <Link to={`/posts/image/${id}`} ><h6 className="float-right">{commentsNum} Comments</h6></Link>
                </div>
            </div>
        </div>
    );
};







