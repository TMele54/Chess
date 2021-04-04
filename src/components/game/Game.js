import React from "react";
import ChessSet from './BoardGame'

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    render(){
        return(
            <ChessSet key={"CHESS_SET"} />
        )
    }
}

export default Game