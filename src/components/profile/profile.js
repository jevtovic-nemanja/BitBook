import React from "react";

export const Profile = props => {
    const { name, aboutShort, about, avatarUrl, postsCount, commentsCount } = props.user;

    return (
        <div className="text-center w-100 mx-auto mt-5 col-lg-8">
            <img src={avatarUrl
                ? avatarUrl
                : "../../images/batman.jpg"
            } className="profileimage w-50" />
            <div className="w-75 mx-auto">
                <h2 className="profilename mt-3">{name}</h2>
                <em>{aboutShort}</em>
                <p className="mt-3 w-100 mx-auto">{about}</p>
                <div className="mx-auto w-100 mt-4" >
                    <div className="profilecounter mb-2 rounded border-1 mx-auto w-75">Posts: {postsCount}</div>
                    <div className="profilecounter mb-4 rounded border-1 mx-auto w-75">Comments: {commentsCount}</div>
                </div>
            </div>
        </div>
    );
};