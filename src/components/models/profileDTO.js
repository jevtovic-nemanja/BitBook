class ProfileDTO {
    constructor(name, bio, about, picture, noOfPosts, noOfComments) {
        this.name = name;
        this.bio = bio;
        this.about = about;
        this.picture = picture;
        this.noOfPosts = noOfPosts;
        this.noOfComments = noOfComments;
    }

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }

    get bio() {
        return this.bio;
    }

    set bio(value) {
        this.bio = value;
    }

    get about() {
        return this.about;
    }

    set about(value) {
        this.about = value;
    }

    get picture() {
        return this.picture;
    }

    set picture(value) {
        this.picture = value;
    }

    get noOfPosts() {
        return this.noOfPosts;
    }

    get noOfComments() {
        return this.noOfComments;
    }
}

export default ProfileDTO;