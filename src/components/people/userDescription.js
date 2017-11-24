import React from "react";

export const UserDescription = (props) => {
    const { _name, _aboutShort, _lastPostDate, _avatarUrl } = props.userData;
    console.log(props.userData);
    return (
        <div>
            <div>
                <img src={_avatarUrl} />
            </div>
            <div>
                <h3>{_name}</h3>
                <p>{_aboutShort}</p>
            </div>
            <div>
                <p>{_lastPostDate}</p>
            </div>
        </div>
    );
};