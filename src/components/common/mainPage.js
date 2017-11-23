import React from "react";
import Header from "./header";
import ProfilePage from "../profile/profilePage";
import Footer from "./footer";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <ProfilePage />
                <Footer />
            </div>
        );
    }
}

export default MainPage;