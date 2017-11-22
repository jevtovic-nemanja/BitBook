import axios from "axios";

import { SESSION_ID, API_KEY } from "../../constants";

class ServiceAPI {
    constructor() { }

    getFromAPI(url, dataObject, callback) {
        const requestData = {
            url: url,
            method: "GET",
            body: dataObject,
            callback: callback
        };

        this.createRequest(requestData);
    }

    postToAPI(url, dataObject, callback) {
        const requestData = {
            url: url,
            method: "POST",
            body: dataObject,
            callback: callback
        };

        this.createRequest(requestData);
    }

    createRequest(requestData) {
        const sessionId = JSON.parse(sessionStorage.getItem(SESSION_ID));

        let headers = null;
        if (sessionId) {
            headers = {
                "Content-Type": "application/json",
                "Key": API_KEY,
                "SessionId": sessionId,
                "Allow": "application/json"
            };
        } else {
            headers = {
                "Content-Type": "application/json",
                "Key": API_KEY,
                "Allow": "application/json"
            };
        }

        axios({
            method: requestData.method,
            url: requestData.url,
            headers: headers,
            data: JSON.stringify(requestData.body),
            JSON: true
        })
            .then(response => requestData.callback(response.data));
    }
}

export default ServiceAPI;