import React from "react";

export const Profile = props => {
    const { name, aboutShort, about, avatarUrl, postsCount, commentsCount } = props.user;

    return (
        <div className="profilecontent">
            <div className="row">
                <img src={avatarUrl
                    ? avatarUrl
                    : "../../images/batman.jpg"
                } className="profileimage" />
            </div>
            <div className="row">
                <div className="profileTextContent">
                    <h2 className="profilename">{name}</h2>
                    <em>{aboutShort}</em>
                    <p className="profileabout">{about}</p>
                    <div className="profilecounter">Posts: {postsCount}</div>
                    <div className="profilecounter">Comments: {commentsCount}</div>
                </div>
            </div>
        </div>
    );
};