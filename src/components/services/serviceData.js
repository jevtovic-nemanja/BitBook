import { BASE_URL } from "../../constants";
import { APIService } from "./serviceApi";

import Profile from "../models/profile";
import User from "../models/user";
import Post from "../models/post";
import CommentModel from "../models/commentModel";

class ServiceData {
    constructor() { }

    getProfile(callback, errorCallback) {
        APIService.getFromAPI("/profile", responseData => callback(this.packProfile(responseData)),
            errorCallback);
    }

    updateProfile(dataObject, callback, errorCallback) {
        APIService.putToAPI("/Profiles", dataObject,
            response => this.getProfile(callback, errorCallback),
            errorCallback);
    }

    getUsers(callback, errorCallback) {
        APIService.getFromAPI("/users", responseData => {
            let users = responseData.map(item => {
                let { id, name, aboutShort, lastPostDate, avatarUrl } = item;
                return new User(id, name, aboutShort, lastPostDate, avatarUrl);
            });
            callback(users);
        }, errorCallback);
    }

    getUserProfile(id, callback, errorCallback) {
        APIService.getFromAPI(`/users/${id}`, responseData => callback(this.packProfile(responseData)),
            errorCallback);
    }

    packProfile(responseData) {
        const { userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount } = responseData;
        const profile = new Profile(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount);
        return profile;
    }

    getPosts(callback, errorCallback) {
        APIService.getFromAPI("/Posts", responseData => {
            let posts = responseData.map(item => this.packPost(item));
            callback(posts);
        }, errorCallback);
    }

    getTextPost(id, callback, errorCallback) {
        APIService.getFromAPI(`/TextPosts/${id}`, responseData => callback(this.packPost(responseData)), errorCallback);
    }

    getImagePost(id, callback, errorCallback) {
        APIService.getFromAPI(`/ImagePosts/${id}`, responseData => callback(this.packPost(responseData)), errorCallback);
    }

    getVideoPost(id, callback, errorCallback) {
        APIService.getFromAPI(`/VideoPosts/${id}`, responseData => callback(this.packPost(responseData)), errorCallback);
    }

    packPost(responseData) {
        const { id, dateCreated, userId, userDisplayName, type, text, imageUrl, videoUrl, commentsNum } = responseData;
        const post = new Post(id, dateCreated, userId, userDisplayName, type, text, imageUrl, videoUrl, commentsNum);
        return post;
    }

    postTextPost(dataObject, callback, errorCallback) {
        APIService.postToAPI("/TextPosts", dataObject, response => this.getPosts(callback, errorCallback),
            errorCallback);
    }

    postImagePost(dataObject, callback, errorCallback) {
        APIService.postToAPI("/ImagePosts", dataObject, response => this.getPosts(callback, errorCallback),
            errorCallback);
    }

    postVideoPost(dataObject, callback, errorCallback) {
        APIService.postToAPI("/VideoPosts", dataObject, response => this.getPosts(callback, errorCallback),
            errorCallback);
    }

    getComments(id, callback, errorCallback) {
        APIService.getFromAPI(`/Comments/?postId=${id}`, responseData => {
            let comments = responseData.map(item => {
                let { id, dateCreated, body, postId, authorId, authorName } = item;
                return new CommentModel(id, dateCreated, body, postId, authorId, authorName);
            });
            callback(comments);
        }, errorCallback);
    }

    postComment(commentData, callback, errorCallback) {
        const postId = commentData.postId;

        APIService.postToAPI("/Comments", commentData, response => this.getComments(postId, callback, errorCallback),
            errorCallback);
    }

    uploadImage(data, callback, errorCallback) {
        APIService.postToAPI("/upload", data, callback, errorCallback);
    }
}



export const dataService = new ServiceData();