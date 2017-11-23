import React from "react";



class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        return {
            name: "",
            aboutShort: "",
            about: "",
            avatarUrl : "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg",
            postsCount: 0,
            commentsCount : 0
        };
    }


    render() {
        return (
            <div className="profilecontent">
                <img src={this.state.avatarUrl} className="profileimage" />
                <h1 className="profilename"> Ime i Prezime</h1>
                <p className="profileabout"> Mali paragraf</p>
                <p className="profileabout"> Veliki paragraf</p>
                <div className="profilecounter">post counter </div>
                <div className="profilecounter"> comment counter</div>
            </div>

        );
    }
}

export default ProfilePage;