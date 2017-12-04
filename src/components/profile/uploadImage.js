import React from "react";

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            image: "",
            error: ""
        };
    }

    bindEventHandlers() {
        this.previewImage = this.previewImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    previewImage(event) {
        const image = event.target.files[0];

        if (image && image.type.startsWith("image/")) {
            this.setState({
                image: window.URL.createObjectURL(image),
                error: ""
            });
        } else {
            this.setState({ error: "Invalid file type! Please select an image file." });
        }
    }

    uploadImage(event) {
        event.preventDefault();

        
    }

    render() {
        const { image, error } = this.state;
        const previewStyle = {
            width: 15 + "rem",
            maxHeight: 15 + "rem"
        };

        return (
            <div>
                <label>Select image for upload:</label>
                <input type="file" onChange={this.previewImage} />
                <p className="error">{error}</p>
                <img src={image} style={previewStyle} className="d-block mx-auto" />
                <button onClick={this.uploadImage} >Upload</button>
            </div>
        );
    }
}

export default UploadImage;