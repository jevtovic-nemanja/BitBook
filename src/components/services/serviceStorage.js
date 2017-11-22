class ServiceStorage {
    constructor() {
        this.storage = sessionStorage;
    }

    getStorageItem(key) {
        return this.storage.getItem(key);
    }

    setStorageItem(key, data) {
        return this.storage.setItem(key, data);
    }

    clearStorage() {
        return this.storage.clear();
    }
}

export const storageService = new ServiceStorage();