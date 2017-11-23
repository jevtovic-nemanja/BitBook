import React from "react";



class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <footer className="bg-light text-white mt-4 ">
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
}


export default Footer;