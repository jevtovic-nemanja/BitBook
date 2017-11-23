import axios from "axios";

import { SESSION_ID, API_KEY, BASE_URL } from "../../constants";
import { storageService } from "./serviceStorage";

class ServiceAPI {
    constructor() { }

    getFromAPI(url, callback, errorCallback) {
        const requestData = {
            url: url,
            method: "GET",
            callback: callback,
            errorCallback: errorCallback
        };

        this.createRequest(requestData);
    }

    postToAPI(url, dataObject, callback, errorCallback) {
        const requestData = {
            url: url,
            method: "POST",
            body: dataObject,
            callback: callback,
            errorCallback: errorCallback
        };

        this.createRequest(requestData);
    }

    putToAPI(url, dataObject, callback, errorCallback){
        const requestData = {
            url: url,
            method: "PUT",
            body: dataObject,
            callback: callback,
            errorCallback: errorCallback
        };

        this.createRequest(requestData);
    }

    createRequest(requestData) {
        const sessionId = storageService.getStorageItem(SESSION_ID);

        let headers = {
            "Content-Type": "application/json",
            "Key": API_KEY,
            "Allow": "application/json"
        };

        if (sessionId) {
            headers.SessionId = sessionId;
        }

        let axiosConfig = {
            baseURL: BASE_URL,
            method: requestData.method,
            url: requestData.url,
            headers: headers,
            JSON: true
        };

        if (requestData.body) {
            axiosConfig.data = JSON.stringify(requestData.body);
        }

        axios(axiosConfig)
            .then(response => requestData.callback(response.data))
            .catch(error => requestData.errorCallback(error));
    }
}

export const APIService = new ServiceAPI();