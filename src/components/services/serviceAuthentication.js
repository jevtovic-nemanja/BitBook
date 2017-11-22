import { APIService } from "./serviceApi";
import { redirect } from "./serviceRedirect";

import { BASE_URL, SESSION_ID } from "../../constants";

class ServiceAuthentication {
    constructor() {}

    isAuthenticated() {
        const sessionId = sessionStorage.getItem(SESSION_ID);
        if (sessionId) {
            return true;
        } else {
            return false;
        }
    }

    logIn(data, errorCallback) {
        const url = "/login";

        APIService.postToAPI(url, data, responseData => {
            sessionStorage.setItem(SESSION_ID, responseData.sessionId);
            redirect("/");
        }, error => errorCallback(error));
    }

    logOut() {
        sessionStorage.clear();
        redirect("/");
    }

    register(data, errorCallback) {
        const url = "/register";

        APIService.postToAPI(url, data, responseData => {
            redirect("/");
        }, error => errorCallback(error));
    }
}

export const  authenticationService = new ServiceAuthentication();