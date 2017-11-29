import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import moment from "moment";

export const UserDescription = (props) => {
    const { _id, _name, _aboutShort, _lastPostDate, _avatarUrl } = props.userData;
    const lastPostDate = moment(_lastPostDate).fromNow();

    return (
        <Link to={`/people/${_id}`} >
            <div className="card mb-4 w-100" >
                <div className="card-body h-100">
                    <div className="row h-100" >
                        <div className="text-center h-100 w-25 pl-3" >
                            <img src={_avatarUrl
                                ? _avatarUrl
                                : "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg"
                            }
                            className="w-100 h-100 rounded-circle img-responsive" />
                        </div>
                        <div className="w-50 pl-5 mt-5">
                            <h3>{_name}</h3>
                            <em>{_aboutShort}</em>
                        </div>
                        <div className="w-25 pl-5 mt-5">
                            <p>{lastPostDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};