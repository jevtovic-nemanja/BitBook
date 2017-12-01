class Post {
    constructor(id, dateCreated, userId, userDisplayName, type, text, imageUrl, videoUrl, commentsNum ) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._userId = userId;
        this._userDisplayName = userDisplayName;
        this._type = type;
        this._text = text;
        this._imageUrl = imageUrl;
        this._videoUrl = videoUrl;
        this._commentsNum = commentsNum;
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

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(value) {
        this._imageUrl = value;
    }

    get videoUrl() {
        return this._videoUrl;
    }

    set videoUrl(value) {
        this._videoUrl = value;
    }

    get commentsNum() {
        return this._commentsNum;
    }

}

export default Post;