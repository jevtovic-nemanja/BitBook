import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./header";
import { Footer } from "./footer";

import ProfilePage from "../profile/profilePage";
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