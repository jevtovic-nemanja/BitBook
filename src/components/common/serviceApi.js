import { SESSION_ID, API_KEY } from "../../constants";

class ServiceAPI {
    constructor() { }

    getFromAPI(url, dataObject, callback) {
        const requestData = {
            url: url,
            method: "GET",
            body: dataObject,
            callback: callback
        }

        this.createRequest(requestData);
    }

    postToAPI(url, dataObject, callback) {
        const requestData = {
            url: url,
            method: "POST",
            body: dataObject,
            callback: callback
        }

        this.createRequest(requestData);
    }

    createRequest(requestData) {
        const sessionId = JSON.parse(sessionStorage.getItem(SESSION_ID));

        let headers = null;
        if (sessionId) {
            headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Key": API_KEY,
                "SessionId": sessionId
            }
        } else {
            headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Key": API_KEY
            }
        }

        const requestOptions = {
            headers: headers,
            method: requestData.method,
            body: JSON.stringify(requestData.body)
        }

        fetch(requestData.url, requestOptions)
            .then(response => response.json())
            .then(result => requestData.callback(result))
    }

}

export default ServiceAPI;