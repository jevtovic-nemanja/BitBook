import React from "react";
import moment from "moment";

export const Comment = props => {
    const postDate = moment(props.date).fromNow();

    return (
        <div className="card mt-4 w-100" style={{ height: 120 + "px" }} >
            <div className="card-body row pt-2 pb-2">
                <div className="col-2 h-100 text-center">
                    <img src={props.image} className="w-50 rounded-circle my-auto" />
                    <p>{props.author}</p>
                </div>
                <div className="col-10 h-100">
                    <p className="text-justify">{props.body}</p>
                    <small className="float-right">{postDate}</small>
                </div>
            </div>
        </div>
    );
};