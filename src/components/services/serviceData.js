import { BASE_URL } from "../../constants";
import { APIService } from "./serviceApi";
import Profile from "../models/profile";
import User from "../models/user";

class ServiceData {
    constructor() { }

    getProfile(callback, errorCallback) {
        APIService.getFromAPI("/profile", responseData => callback(this.packProfile(responseData)),
            errorCallback);
    }

    updateProfile(dataObject, callback, errorCallback) {
        APIService.putToAPI("/Profiles", dataObject,
            response => this.getProfile(callback, errorCallback),
            errorCallback);
    }

    getUsers(callback, errorCallback) {
        APIService.getFromAPI("/users", responseData => {
            let users = responseData.map(item => {
                let {id, name, aboutShort, lastPostDate, avatarUrl} = item;
                return new User(id, name, aboutShort, lastPostDate, avatarUrl);
            });
            callback(users);
        }, errorCallback);
    }

    getUserProfile(id, callback, errorCallback) {
        APIService.getFromAPI(`/users/${id}`, responseData => callback(this.packProfile(responseData)),
            errorCallback);
    }

    packProfile(responseData) {
        const { userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount } = responseData;
        const profile = new Profile(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
        return profile;
    }

}



export const dataService = new ServiceData();