class User {
    constructor(id, name, aboutShort, lastPostDate, avatarUrl) {
        this._id = id;
        this._name = name;
        this._aboutShort = aboutShort;
        this._lastPostDate = lastPostDate;
        this._avatarUrl = avatarUrl;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
    
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get aboutShort() {
        return this._aboutShort;
    }

    set aboutShort(value) {
        this._aboutShort = value;
    }

    get lastPostDate() {
        return this._lastPostDate;
    }

    set lastPostDate(value) {
        this._lastPostDate = value;
    }

    get avatarUrl() {
        return this._avatarUrl;
    }

    set avatarUrl(value) {
        this._avatarUrl = value;
    }

}

export default User;