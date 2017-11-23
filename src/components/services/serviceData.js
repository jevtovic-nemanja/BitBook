import { BASE_URL } from "../../constants";
import { APIService } from "./serviceApi";
import ProfileDTO from "../models/profileDTO";

class ServiceData {
    constructor() { }

    getProfile(callback, errorCallback) {
        APIService.getFromAPI("/profile", responseData => {
            const { name, aboutShort, about, avatarUrl, postsCount, commentsCount } = responseData;
            const profile = new ProfileDTO(name, aboutShort, about, avatarUrl, postsCount, commentsCount);
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