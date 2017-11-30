import React from "react";
import { Switch, Route } from "react-router-dom";

import { storageService } from "../services/serviceStorage";
import { USER_ID } from "../../constants";

import { Header } from "./header";

import ProfilePage from "../profile/profilePage";
import FeedPage from "../feed/feedPage";
import PeoplePage from "../people/peoplePage";
import UserProfilePage from "../people/userProfilePage";
import SingleTextPost from "../posts/singlePost/singleTextPost";
import SingleImagePost from "../posts/singlePost/singleImagePost";
import SingleVideoPost from "../posts/singlePost/singleVideoPost";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userId = storageService.getStorageItem(USER_ID);

        return (
            <div className="wrapper">
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={FeedPage} />
                        <Route path="/feed" component={FeedPage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route exact path="/people" component={PeoplePage} />
                        <Route exact path={`/people/${userId}`} component={ProfilePage} />
                        <Route path="/people/:id" component={UserProfilePage} />
                        <Route path="/textPosts/:id" component={SingleTextPost} />
                        <Route path="/imagePosts/:id" component={SingleImagePost} />
                        <Route path="/videoPosts/:id" component={SingleVideoPost} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default MainPage;