import { BASE_URL } from "../../constants";
import { APIService } from "./serviceApi";

class ServiceData {
    constructor() { }

    getProfile(callback, errorCallback) {
        APIService.getFromAPI("/profile", callback, errorCallback);
    }
}

export const dataService = new ServiceData();