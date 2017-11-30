import React from "react";

export const Comment = props => {
    return (
        <div className="card mb-4" style={{ width: 100 + "%" }} >
            <div className="card-body">
                <h4>{props._authorName}</h4>
                <p>{props._body}</p>
            </div>
        </div>
    );
};