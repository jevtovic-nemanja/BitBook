import React from "react";

export const Profile = props => {
    const { name, aboutShort, about, avatarUrl, postsCount, commentsCount } = props.user;

    return (
        <div className="profilecontent">
            <img src={avatarUrl
                ? avatarUrl
                : "http://3.bp.blogspot.com/JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg"
            } className="profileimage" />
            <h1 className="profilename">{name}</h1>
            <em>{aboutShort}</em>
            <p className="profileabout">{about}</p>
            <div className="profilecounter">Posts: {postsCount}</div>
            <div className="profilecounter">Comments: {commentsCount}</div>
        </div>
    );
};