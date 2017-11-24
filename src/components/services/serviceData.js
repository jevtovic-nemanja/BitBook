import { BASE_URL } from "../../constants";
import { APIService } from "./serviceApi";
import Profile from "../models/profile";
import User from "../models/user";

class ServiceData {
    constructor() { }

    getProfile(callback, errorCallback) {
        APIService.getFromAPI("/profile", responseData => {
            const { name, email, aboutShort, about, avatarUrl, postsCount, commentsCount } = responseData;
            const profile = new Profile(name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
            callback(profile);
        }, errorCallback);
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
        APIService.getFromAPI(`/users/${id}`, responseData => {
            const { name, email, aboutShort, about, avatarUrl, postsCount, commentsCount } = responseData;
            const profile = new Profile(name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
            callback(profile);
        }, errorCallback);
    }

}



export const dataService = new ServiceData();