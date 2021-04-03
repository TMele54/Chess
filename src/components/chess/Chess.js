import React, { useState } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import useImage from 'use-image';
import Gambit from "./chessLogic";
import $ from "jquery";
const chessMoves = require('chess');
class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            data: []
        }
    }
    render() {
        return(
            <React.Fragment><Gambit />
            <Chess /></React.Fragment>
            )
    }
}
const moveEngine = chessMoves.create({ PGN : true });

moveEngine.on('capture', (move) => {
    console.log('A piece has been captured!');
    console.log(move);
});
moveEngine.on('castle', (move) => {
    console.log('A castle has occured!');
    console.log(move);
});
moveEngine.on('check', (attack) => {
    console.log('The King is under attack!');
    console.log(attack);
});
moveEngine.on('checkmate', (attack) => {
    console.log('The game has ended due to checkmate!');
    console.log(attack);
});
moveEngine.on('enPassant', (move) => {
    console.log('An en Passant has occured!');
    console.log(move);
});
moveEngine.on('move', (move) => {
    console.log('A piece was moved!');
    console.log(move);
});
moveEngine.on('promote', (square) => {
    console.log('A Pawn has been promoted!');
    console.log(square);
});
moveEngine.on('undo', (move) => {
    console.log('A previous move was undone!');
    console.log(move);
});

const Chess = (props) => {
    
    const whitePieces = () => {
        return [
                {"player": "w", "id": "w0", "svg": "wp.svg", "pos": "a2", "name": "pawn"},
                {"player": "w", "id": "w1", "svg": "wp.svg", "pos": "b2", "name": "pawn"},
                {"player": "w", "id": "w2", "svg": "wp.svg", "pos": "c2", "name": "pawn"},
                {"player": "w", "id": "w3", "svg": "wp.svg", "pos": "d2", "name": "pawn"},
                {"player": "w", "id": "w4", "svg": "wp.svg", "pos": "e2", "name": "pawn"},
                {"player": "w", "id": "w5", "svg": "wp.svg", "pos": "f2", "name": "pawn"},
                {"player": "w", "id": "w6", "svg": "wp.svg", "pos": "g2", "name": "pawn"},
                {"player": "w", "id": "w7", "svg": "wp.svg", "pos": "h2", "name": "pawn"},
                {"player": "w", "id": "w8", "svg": "wr.svg", "pos": "a1", "name": "rook"},
                {"player": "w", "id": "w9", "svg": "wr.svg", "pos": "h1", "name": "rook"},
                {"player": "w", "id": "w10", "svg": "wn.svg", "pos": "b1", "name": "knight"},
                {"player": "w", "id": "w11", "svg": "wn.svg", "pos": "g1", "name": "knight"},
                {"player": "w", "id": "w12", "svg": "wb.svg", "pos": "c1", "name": "bishop"},
                {"player": "w", "id": "w13", "svg": "wb.svg", "pos": "f1", "name": "bishop"},
                {"player": "w", "id": "w14", "svg": "wq.svg", "pos": "d1", "name": "queen"},
                {"player": "w", "id": "w15", "svg": "wk.svg", "pos": "e1", "name": "king"}
                ]
    }
    const blackPieces = () => {
    return [
            {"player": "b", "id": "b0", "svg": "bp.svg", "pos": "a7", "name": "pawn"},
            {"player": "b", "id": "b1", "svg": "bp.svg", "pos": "b7", "name": "pawn"},
            {"player": "b", "id": "b2", "svg": "bp.svg", "pos": "c7", "name": "pawn"},
            {"player": "b", "id": "b3", "svg": "bp.svg", "pos": "d7", "name": "pawn"},
            {"player": "b", "id": "b4", "svg": "bp.svg", "pos": "e7", "name": "pawn"},
            {"player": "b", "id": "b5", "svg": "bp.svg", "pos": "f7", "name": "pawn"},
            {"player": "b", "id": "b6", "svg": "bp.svg", "pos": "g7", "name": "pawn"},
            {"player": "b", "id": "b7", "svg": "bp.svg", "pos": "h7", "name": "pawn"},
            {"player": "b", "id": "b8", "svg": "br.svg", "pos": "a8", "name": "rook"},
            {"player": "b", "id": "b9", "svg": "br.svg", "pos": "h8", "name": "rock"},
            {"player": "b", "id": "b10", "svg": "bn.svg", "pos": "b8", "name": "knight"},
            {"player": "b", "id": "b11", "svg": "bn.svg", "pos": "g8", "name": "knight"},
            {"player": "b", "id": "b12", "svg": "bb.svg", "pos": "c8", "name": "bishop"},
            {"player": "b", "id": "b13", "svg": "bb.svg", "pos": "f8", "name": "bishop"},
            {"player": "b", "id": "b14", "svg": "bq.svg", "pos": "d8", "name": "queen"},
            {"player": "b", "id": "b15", "svg": "bk.svg", "pos": "e8", "name": "king"}
            ]
}

    const [white] = useState(whitePieces)
    const [black] = useState(blackPieces)
    const [positions] = useState([])

    const programmaticMotion = (id) => {
        console.log("You called Move Piece:", id)
        console.log("Input", id)
        const instruction = ["Nc3"]

        var stage = $(".STAGE").find('#'+id)[0]

        console.log("STAGE STAGE STAGE SATGE")
        console.log("STAGE STAGE STAGE SATGE",stage)
        console.log("STAGE STAGE STAGE SATGE")

        //moveEngine.move('e4');

        console.log("Move Piece CompletedZZZ")
    }
    const Material = (d) => {
        console.log("MATERIAL:", d)
        const [image] = useImage(d.pth);
        const positions = d.rel
        const position = positions.filter(p => p.cell === d.pos)[0]
        const squareSize = 75
        const offsetDraw = 2
        const offsetDrop = 7
        const A = 1;
        const B = 1;

        // Initialize X and Y positions
        var X = '';
        var Y = '';

        //var shape = stage.find('#myRect')[0];
        {/*
          if (tween) {
            tween.destroy();
          }

          tween = new Konva.Tween({
            node: shape,
            duration: 1,
            scaleX: Math.random() * 2,
            scaleY: Math.random() * 2,
            easing: Konva.Easings.ElasticEaseOut,
          }).play();
          */}
        return <Image image={image} height={d.size} width={d.size}
                    x={position.x-offsetDraw} y={position.y-offsetDraw} id={d.id}
                    draggable={true}
                    onDragStart={(e) => {
                        // store previous position
                        X =  e.target.x()
                        Y =  e.target.y()

                    }}
                    onDragEnd={(e) => {
                        if (A === B) {
                            e.target.to({
                                x: offsetDrop + Math.round(e.target.x() / squareSize) * squareSize,
                                y: offsetDrop + Math.round(e.target.y() / squareSize) * squareSize
                            })
                        }
                        else{
                            e.target.to({ x: X, y: Y})
                        }

                     } }
                    piece={d.piece} onClick={(ev) => (ev)}/>;

        };

    const Board = () => {

        const chessmen = [...black, ...white];
        const n = 8;
        const squareSize = 75;
        const chessmenSize = 80;
        const boardTopx = 10;
        const boardTopy = 10;
        const boardHeight = boardTopy+squareSize*8+10;
        const boardWidth = boardTopx+squareSize*8+10;
        const A = "#D18B47";
        const B = "#FFCE9E";
        const transpose = a => a[0].map((_, c) => a.map(r => r[c]));

        const alpha = ["a", "b", "c", "d", "e", "f", "g", "h"]
        const numeric = ["8", "7", "6", "5", "4", "3", "2", "1"]
        const mapp = alpha.flatMap(d => numeric.map(v => d + v))
        const chessboard = new Array(Math.ceil(mapp.length / n)).fill().map(_ => mapp.splice(0, n))
        const field = chessboard[0].map((_, colIndex) => chessboard.map(row => row[colIndex]));
        const grid = transpose(field)

        return(
            <Stage height={boardHeight} width={boardWidth} key={"STAGE"} className={"STAGE"}>
                <Layer key={"BOARD"}>
                    {grid.map((row, i) => (
                        <React.Fragment>
                            {row.reverse().map((cell, j) => {
                                positions.push({"cell": cell, "x": boardTopx+squareSize*i, "y": boardTopy+squareSize*j})

                                return(
                                    <React.Fragment>
                                        <Rect
                                            key={i.toString()+j.toString()}
                                            name={cell}
                                            x={boardTopx+squareSize*i}
                                            y={boardTopy+squareSize*j}
                                            width={squareSize}
                                            height={squareSize}
                                            fill={ j % 2 !== 0 ?  i % 2 !== 0 ? A : B : i % 2 === 0 ? A : B}
                                            shadowBlur={2}
                                            onClick={(s)=>{return (s.toString())}}
                                        />
                                        <Text key={i.toString()+j.toString()+"_TEXT"} text={cell} fontSize={15} x={boardTopx+squareSize*i} y={boardTopy+squareSize*j} />{/**/}
                                    </React.Fragment>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </Layer>
                <Layer key={"PIECES"}>
                    {chessmen.map((d, i) => {
                        return (
                            <Material
                                pth={'./pieces/'+d.svg}
                                pos={d.pos}
                                rel={positions}
                                id={d.id}
                                size={chessmenSize}
                                piece={d.name}
                            />
                        )
                    })}
                </Layer>
            </Stage>
        )

   }
    programmaticMotion("w3")
    return <Board />
}

export default Game;