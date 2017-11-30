class Comment {
    constructor(id, dateCreated, body, postId, authorId, authorName) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._body = body;
        this._postId = postId;
        this._authorId = authorId;
        this._authorName = authorName;
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

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get postId() {
        return this._postId;
    }

    get authorId() {
        return this._authorId;
    }

    get authorName() {
        return this._authorName;
    }

    set authorName(value) {
        this._authorName = value;
    }

}

export default Comment;