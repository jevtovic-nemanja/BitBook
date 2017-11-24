import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";

export const UserDescription = (props) => {
    const { _id, _name, _aboutShort, _lastPostDate, _avatarUrl } = props.userData;

    return (
        <Link to={`/people/${_id}`} >
            <div className="userDescription float-left">
                <div className="userImage">
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
        </Link>
    );
};