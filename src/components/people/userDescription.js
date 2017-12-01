import React from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../../constants";
import moment from "moment";

export const UserDescription = (props) => {
    const { id, name, aboutShort, lastPostDate, avatarUrl } = props.userData;
    const lastPostTime = moment(lastPostDate).fromNow();

    return (
        <Link to={`/people/${id}`} >
            <div className="card mb-4 w-100" style={{ height: 450 + "px"}} >
                <img src={avatarUrl
                    ? avatarUrl
                    : "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg"
                }
                className="mx-auto mt-3 rounded-circle card-img-top"
                style={{ width: 250 + "px", height: 230 + "px"}} />
                <div className="card-body w-100 text-center">
                    <h3>{name}</h3>
                    <em>{aboutShort}</em>
                    <p className="mt-5">{lastPostTime}</p>
                </div>
            </div>
        </Link>
    );
};