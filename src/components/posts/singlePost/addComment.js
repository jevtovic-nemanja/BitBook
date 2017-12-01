import React from "react";

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            newComment: ""
        };
    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();

        const value = event.target.value;

        this.setState({ newComment: value });
    }

    postComment(event) {
        event.preventDefault();

        const isValid = this.validateInput();

        if (isValid) {
            const postId = this.props.id;

            const commentData = { postId: postId, body: this.state.newComment };

            this.props.onPostComment(commentData);
        }
    }

    validateInput() {
        if (!this.state.newComment) {
            this.setState({ commentsError: "Please enter some text." });
            return false;
        } else {
            return true;
        }
    }


    render() {
        return (
            <form className="mt-4 mb-4">
                <input type="text" placeholder="Add your comment..." value={this.state.newComment} onChange={this.handleInputChange} />
                <button onClick={this.postComment} >Send</button>
            </form>
        );
    }
}

export default AddComment;