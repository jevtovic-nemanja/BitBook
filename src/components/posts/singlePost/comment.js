import React from "react";

export const Comment = props => {
    console.log(props);
    return (
        <div className="card mb-4" style={{ width: 100 + "%" }} >
            <div className="card-body">
                <h4>{props.author}</h4>
                <p>{props.body}</p>
            </div>
        </div>
    );
};