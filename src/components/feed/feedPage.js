import React from "react";

class FeedPage extends React.Component{
    constructor(props){
        super(props);

        this.state = this.initState();
    }

    initState(){
        return {};
    }
    


    render(){
        return(

            <p> Feed </p>
        );
    }
}

export default FeedPage;