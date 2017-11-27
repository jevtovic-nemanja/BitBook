import React from "react";

export const Footer = () => {
    return (
        <footer className="bg-light text-white mt-4 fixed-bottom">
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3 text-right small align-self-end footertext">©2017 BlueTeam, Inc.</div>
                </div>
            </div>
        </footer>
    );
};