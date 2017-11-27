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
                    <img src={_avatarUrl
                        ? _avatarUrl
                        : "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg"
                    } />
                </div>
                <div className="userInfo col-6">
                    <h3>{_name}</h3>
                    <em>{_aboutShort}</em>
                </div>
                <div className="userLastPost col-3">
                    <p>{lastPostDate}</p>
                </div>
            </div>
        </Link>
    );
};