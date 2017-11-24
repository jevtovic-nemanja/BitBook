import React from "react";
import Header from "./header";
import ProfilePage from "../profile/profilePage";
import Footer from "./footer";
import { Switch, Route } from "react-router-dom";
import FeedPage from "../feed/feedPage";
import PeoplePage from "../people/peoplePage";
import { storageService } from "../services/serviceStorage";
import { USERNAME } from "../../constants";


class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header myUserName={storageService.getStorageItem(USERNAME)} />
                <Switch>
                    <Route exact path="/" component={FeedPage} />
                    <Route path="/feed" component={FeedPage} />
                    <Route path="/profile/:id" component={ProfilePage} />
                    <Route path="/people" component={PeoplePage} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default MainPage;