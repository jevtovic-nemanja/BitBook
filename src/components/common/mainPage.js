import React from "react";
import { Switch, Route } from "react-router-dom";

import { storageService } from "../services/serviceStorage";
import { USER_ID } from "../../constants";

import { Header } from "./header";
import { Footer } from "./footer";

import ProfilePage from "../profile/profilePage";
import FeedPage from "../feed/feedPage";
import PeoplePage from "../people/peoplePage";
import UserProfilePage from "../people/userProfilePage";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userId = storageService.getStorageItem(USER_ID);

        return (
            <div className="wrapper">
                <Header />
                <Switch>
                    <Route exact path="/" component={FeedPage} />
                    <Route path="/feed" component={FeedPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route exact path="/people" component={PeoplePage} />
                    <Route exact path={`/people/${userId}`} component={ProfilePage} />
                    <Route path="/people/:id" component={UserProfilePage} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default MainPage;