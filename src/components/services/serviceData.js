import { BASE_URL } from "../../constants";
import { APIService } from "./serviceApi";
import Profile from "../models/profile";

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
}

export const dataService = new ServiceData();