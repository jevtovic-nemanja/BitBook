import serviceAPI from "./serviceApi";
import { BASE_URL } from "../../constants";

class ServiceAuthentication {
    constructor() { }

    isAuthenticated() {
        const sessionId = JSON.parse(sessionStorage.getItem(SESSION_ID));
        sessionId
            ? true
            : false;
    }

    logIn(data) {
        const url = `${BASE_URL}/login`;
        
        serviceAPI.postToAPI(url, data, );
    }
}

export default ServiceAuthentication;