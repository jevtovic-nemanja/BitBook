import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import moment from "moment";

export const UserDescription = (props) => {
    const { _id, _name, _aboutShort, _lastPostDate, _avatarUrl } = props.userData;
    const lastPostDate = moment(_lastPostDate).fromNow();

    return (
        <Link to={`/people/${_id}`} >
            <div className="userDescription float-left row">
                <div className="userImage col-3 text-center">
                    <img src={_avatarUrl} />
                </div>
                <div className="userInfo col-6">
                    <h3>{_name}</h3>
                    <p>{_aboutShort}</p>
                </div>
                <div className="userLastPost col-3">
                    <p>{lastPostDate}</p>
                </div>
            </div>
        </Link>
    );
};