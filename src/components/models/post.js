class Post {
    constructor(id, dateCreated, userId, userDisplayName, type) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._userId = userId;
        this._userDisplayName = userDisplayName;
        this._type = type;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
    
    get dateCreated() {
        return this._dateCreated;
    }

    get userId() {
        return this._userId;
    }

    get userDisplayName() {
        return this._userDisplayName;
    }

    set userDisplayName(value) {
        this._userDisplayName = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

}

export default Post;