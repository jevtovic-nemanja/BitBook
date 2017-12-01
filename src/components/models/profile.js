class Profile {
    constructor(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount) {
        this._userId = userId;
        this._name = name;
        this._email = email;
        this._aboutShort = aboutShort;
        this._about = about;
        this._avatarUrl = avatarUrl;
        this._postsCount = postsCount;
        this._commentsCount = commentsCount;
    }

    get userId() {
        return this._userId;
    }
    
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
    
    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get aboutShort() {
        return this._aboutShort;
    }

    set aboutShort(value) {
        this._aboutShort = value;
    }

    get about() {
        return this._about;
    }

    set about(value) {
        this._about = value;
    }

    get avatarUrl() {
        return this._avatarUrl;
    }

    set avatarUrl(value) {
        this._avatarUrl = value;
    }

    get postsCount() {
        return this._postsCount;
    }

    get commentsCount() {
        return this._commentsCount;
    }
}

export default Profile;