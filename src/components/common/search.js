import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            searchString: "",
        
        };
    }

    bindEventHandlers() {
        this.handleInput = this.handleInput.bind(this);
  
    }

    handleInput(event) {
        const searchString = event.target.value;

        this.setState({ searchString: searchString });

        this.props.onSearch(searchString);
    }

    render() {
        const searchString = this.state.searchString;

        return (
            <form >
                <input type="text" value={searchString} onChange={this.handleInput} placeholder="Search..." />
            </form>
        );
    }
}

export default Search;