import React from "react";
import Header from "./header";
import ProfilePage from "../profile/profilePage";
import Footer from "./footer";
import { Switch, Route } from "react-router-dom";
import FeedPage from "../feed/feedPage";
import PeoplePage from "../people/peoplePage";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={FeedPage} />
                    <Route path="/feed" component={FeedPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/people" component={PeoplePage} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default MainPage;