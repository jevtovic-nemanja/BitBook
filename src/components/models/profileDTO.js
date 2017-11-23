class ProfileDTO {
    constructor(name, bio, about, picture, noOfPosts, noOfComments) {
        this._name = name;
        this._bio = bio;
        this._about = about;
        this._picture = picture;
        this._noOfPosts = noOfPosts;
        this._noOfComments = noOfComments;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get bio() {
        return this._bio;
    }

    set bio(value) {
        this._bio = value;
    }

    get about() {
        return this._about;
    }

    set about(value) {
        this._about = value;
    }

    get picture() {
        return this._picture;
    }

    set picture(value) {
        this._picture = value;
    }

    get noOfPosts() {
        return this._noOfPosts;
    }

    get noOfComments() {
        return this._noOfComments;
    }
}

export default ProfileDTO;