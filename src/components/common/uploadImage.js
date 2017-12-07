import React from "react";

import FormData from "form-data";

import { dataService } from "../services/serviceData";

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            image: "",
            previewImage: "",
            validationError: ""
        };
    }

    bindEventHandlers() {
        this.previewImage = this.previewImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    handleError(error) {
        if (error.response) {
            this.setState({ validationError: error.response.data.error });
        } else if (error.request) {
            this.setState({ validationError: "There is no response from server." });
        }
    }

    previewImage(event) {
        const image = event.target.files[0];

        if (image && image.type.startsWith("image/")) {
            this.setState({
                image: image,
                previewImage: window.URL.createObjectURL(image),
                validationError: ""
            });
        } else {
            this.setState({ validationError: "Invalid file type! Please select an image file." });
        }
    }

    uploadImage(event) {
        event.preventDefault();

        const image = this.state.image;

        let postData = new FormData();
        postData.append("file", image);

        dataService.uploadImage(postData, imageUrl => {
            this.props.uploadImage(imageUrl);
        }, error => this.handleError(error));
    }

    render() {
        const { image, previewImage, validationError } = this.state;
        const previewStyle = {
            width: 25 + "rem",
            maxHeight: 25 + "rem"
        };

        return (
            <div>
                <label>Select image for upload:</label>
                <input type="file" onChange={this.previewImage} className="d-block" />
                <div className="error">
                    {validationError
                        ? <p>{validationError}</p>
                        : <p></p>
                    }
                </div>
                <img src={previewImage} style={previewStyle} className="d-block mx-auto" />
                <div>
                    <button onClick={this.uploadImage} className="btn buttonLight my-2 my-sm-0 saveButtonStyle" >Upload</button>
                    <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.props.toggleModal}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}

export default UploadImage;