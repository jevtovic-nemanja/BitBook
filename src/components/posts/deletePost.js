import React from "react";

import Modal from "react-modal";

class DeletePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            modal: false
        };
    }

    bindEventHandlers() {
        this.deletePost = this.deletePost.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    deletePost() {
        this.props.deletePost(this.props.id);
    }

    toggleModal(event) {
        event.preventDefault();

        this.setState(prevState => {
            prevState.modal = !prevState.modal;
            return prevState;
        });
    }

    getModalStyle() {
        if (screen.width < 579) {
            return {
                content: {
                    position: "absolute",
                    top: "10%",
                    left: "15%",
                    right: "15%",
                    bottom: "",
                    border: "0.5px solid rgba(43, 122, 120, 0.5)",
                    background: "#feffff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "20px"
                }
            };

        } else {
            return {
                content: {
                    position: "absolute",
                    top: "10%",
                    left: "15%",
                    right: "15%",
                    bottom: "",
                    border: "0.5px solid rgba(43, 122, 120, 0.5)",
                    background: "#feffff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "20px"
                }
            };
        };
    }

    render() {
        const {modal} = this.state;

        return (
            <div>
                <i className="fa fa-trash deleteButton" aria-hidden="true" onClick={this.toggleModal}></i>
                <Modal isOpen={modal} style={this.getModalStyle()}>
                    <p>Are you sure you want to delete this post?</p>
                    <button onClick={this.deletePost}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                </Modal>
            </div>
        );
    }
}

export default DeletePost;