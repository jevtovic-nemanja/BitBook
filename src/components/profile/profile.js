import React from "react";

export const Profile = props => {
    const { _name, _aboutShort, _about, _avatarUrl, _postsCount, _commentsCount } = props.user;

    return (
        <div className="profilecontent">
            <img src={_avatarUrl
                ? _avatarUrl
                : "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg"
            } className="profileimage" />
            <h1 className="profilename">{_name}</h1>
            <em>{_aboutShort}</em>
            <p className="profileabout">{_about}</p>
            <div className="profilecounter">Posts: {_postsCount}</div>
            <div className="profilecounter">Comments: {_commentsCount}</div>
        </div>
    );
};