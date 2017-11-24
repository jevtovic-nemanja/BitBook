import React from "react";

class PeoplePage extends React.Component{
    constructor(props){
        super(props);

        this.state = this.initState();
    }

    initState(){
        return {};
    }
    


    render(){
        return(

            <p> Peoples </p>
        );
    }
}

export default PeoplePage;