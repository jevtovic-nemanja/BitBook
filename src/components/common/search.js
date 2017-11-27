import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            inputString: "",
            searchString: ""
        };
    }

    bindEventHandlers() {
        this.handleInput = this.handleInput.bind(this);
  
    }

    handleInput(event) {
        const inputString = event.target.value;
        const searchString = inputString.toLowerCase();

        this.setState({ inputString: inputString, searchString: searchString });

        this.props.onSearch(searchString);
    }

    render() {
        const inputString = this.state.inputString;

        return (
            <form className="search">
                <input type="text" value={inputString} onChange={this.handleInput} placeholder="Search..." />
            </form>
        );
    }
}

export default Search;