import React from "react";
import moment from "moment";

export const Comment = props => {
    const { _body, _dateCreated, _authorName } = props.comment;
    const postDate = moment(_dateCreated).fromNow();

    return (
        <div className="card mt-4 w-100" style={{ height: 120 + "px" }} >
            <div className="card-body row pt-2 pb-2">
                <div className="col-2 h-100 text-center">
                    <img src={props.image} className="w-50 rounded-circle my-auto" />
                    <p>{_authorName}</p>
                </div>
                <div className="col-10 h-100">
                    <p className="text-justify">{_body}</p>
                    <small className="float-right">{postDate}</small>
                </div>
            </div>
        </div>
    );
};