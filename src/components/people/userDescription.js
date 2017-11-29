import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import moment from "moment";

export const UserDescription = (props) => {
    const { _id, _name, _aboutShort, _lastPostDate, _avatarUrl } = props.userData;
    const lastPostDate = moment(_lastPostDate).fromNow();

    return (
        <Link to={`/people/${_id}`} >
            <div className="card mb-4 w-100" style={{ height: 450 + "px"}} >
                <img src={_avatarUrl
                    ? _avatarUrl
                    : "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg"
                }
                className="mx-auto mt-3 rounded-circle card-img-top"
                style={{ width: 250 + "px", height: 230 + "px"}} />
                <div className="card-body w-100 text-center">
                    <h3>{_name}</h3>
                    <em>{_aboutShort}</em>
                    <p className="mt-5">{lastPostDate}</p>
                </div>
            </div>
        </Link>
    );
};