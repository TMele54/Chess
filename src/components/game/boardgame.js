import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import PropTypes from 'prop-types';
import useImage from 'use-image';
import $ from "jquery";
const chessMoves = require('chess');
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

const ChessSet = (props) => {

    // Simulate a Random Walk Chess Game

    function simulateGame() {
        let mv = [];
        setTimeout(function (d,i) {
            let status = moveEngine.getStatus();
            let validMoves = status.notatedMoves;
            const move = validMoves[Math.floor(Math.random() * validMoves.length)];

            Object.keys(moveEngine.notatedMoves).forEach((notation) => {
                mv.push(notation)
                console.log("notation",notation);
            });
            moveEngine.move(mv[0])
            simulateGame();

            }, 1000);
    }


    // SQRT(Number of Tiles)
    const n = 8;

    // Accessing Canvas Elements
    let canvasRef = React.createRef();

    function accessCanvas(d) {
      //  console.log(d)
    }

    // Rank
    const numeric = ["8", "7", "6", "5", "4", "3", "2", "1"]

    // File
    const alpha = ["a", "b", "c", "d", "e", "f", "g", "h"]

    // Dimension of Board Square
    const squareSize = 75;

    // Dimension of Chessman
    const chessmenSize = 80;

    // Padding X
    const Top = 10;
    const Bottom = 10;
    const Left = 10;
    const Right = 10;

    // Chess Board Height
    const boardHeight = Top+squareSize*8+Bottom;

    // Chess Board Width
    const boardWidth = Left+squareSize*8+Right;

    // Chess Board Square Colors
    const A = "#D18B47";
    const B = "#FFCE9E";

    const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
    const mapp = alpha.flatMap(d => numeric.map(v => d + v))
    const chessboard = new Array(Math.ceil(mapp.length / n)).fill().map(_ => mapp.splice(0, n))
    const field = chessboard[0].map((_, colIndex) => chessboard.map(row => row[colIndex]));
    const columns = transpose(field)

    // Chess Pieces
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

    // State Chess Pieces and Board Positions
    const [white] = useState(whitePieces)
    const [black] = useState(blackPieces)
    const [positions] = useState([])
    const [chessmen] = useState([...black, ...white]);
    const emptySquare = { player: null, id: null, svg: null, pos: null, name: null }

    // Generate the Initial Map of the Board
    columns.forEach((rows,i)=>{
        rows.forEach((cell, j)=>{
            const piece = chessmen.filter(d =>  d.pos === cell )[0]
            if (piece === undefined){
                let merged = {...{"cell": cell, "iX": Left+squareSize*i, "iY": Top+squareSize*j, "bX": Left+squareSize*i, "bY": Top+squareSize*j}, ...emptySquare};
                positions.push(merged)
            }
            else{
                let merged = {...{"cell": cell, "iX": Left+squareSize*i, "iY": Top+squareSize*j, "bX": Left+squareSize*i, "bY": Top+squareSize*j}, ...piece};
                positions.push(merged)
            }

        })
    })
    const startBoard = (positions) => {
        return positions
    }

    // Set Board Map to a State Variable
    let [boardMap, updateBoardMap] = useState(startBoard(positions))

    // Draw Pieces on ChessBoard
    const Material = (d) => {
        const test = { pth: "./pieces/bp.svg", pos: "f7", x: 385, y: 85, id: "b5", size: 80, piece: "pawn" }
        const [image] = useImage(d.pth);
        const offsetDraw = 2
        const offsetDrop = 7
        const A = 1;
        const B = 1;

        // Initialize X and Y positions
        var X = '';
        var Y = '';

        return (<Image
                image={image}
                height={d.pieceSize}
                width={d.pieceSize}
                x={d.x-offsetDraw}
                y={d.y-offsetDraw}
                //key={d.key+"_PIECE"}
                //reactKey={d.key+"_PIECE"}
                draggable={true}
                onDragStart={(e) => {X =  e.target.x();Y =  e.target.y();}}
                onDragEnd={(e) => {
                    if (A === B) {
                        e.target.to({
                            x: offsetDrop + Math.round(e.target.x() / d.squareSize) * d.squareSize,
                            y: offsetDrop + Math.round(e.target.y() / d.squareSize) * d.squareSize
                        })
                    }
                    else{
                        e.target.to({ x: X, y: Y})
                    }
                    }}
                piece={d.piece}
                //onClick={(ev) => (ev)}
                //ref={canvasRef}
                // ref={(ref) => d.id = ref}
                onClick={accessCanvas(this)}
            />)


        };

    // Render Chessboard
    const Board = (props) => {
        return (
            <Stage height={boardHeight} width={boardWidth} key={"STAGE"} className={"STAGE"}>
                <Layer key={"BOARD"}>
                    {props.board.map((d, i) => {
                        return (
                            <React.Fragment>
                                <Rect
                                    key={d.id+"_TILE"}
                                    name={d.cell}
                                    x={d.bX}
                                    y={d.bY}
                                    width={props.square}
                                    height={props.square}
                                    fill={ i % 2 !== 0 ? props.tileA : i % 2 !== 0 ?  props.tileA : props.tileB}
                                    shadowBlur={2}
                                    onClick={(s) => { return (s.toString()) }} />
                                <Text key={d.id + "_TEXT"} text={d.cell} fontSize={15} x={d.bX} y={d.bY} />

                            </React.Fragment>
                        )
                    })}
                </Layer>
                <Layer key={"PIECES"}>
                    {props.board.map((d, i) => {
                        return (
                            <Material
                                pth={'./pieces/' + d.svg}
                                pos={d.pos}
                                x={d.iX}
                                y={d.iY}
                                id={d.id}
                                // key={d.id}
                                pieceSize={props.piece}
                                squareSize={props.square}
                                piece={d.name}/>
                            )
                        }
                    )}
                </Layer>
            </Stage>
        )
    }

    // Move Piece Programatically
    function Move(src, tgt){
        const boardMapIndex = boardMap.findIndex(x => x.pos === src);
        const position = boardMap.find(x => x.cell === tgt);

        boardMap[boardMapIndex].pos = tgt;
        boardMap[boardMapIndex].iX = position.bX;
        boardMap[boardMapIndex].iY = position.bY;

        let newArr = [...boardMap];

        updateBoardMap(newArr)
    }

    return  (
    <React.Fragment>
        <button onClick={event => simulateGame()}>Simulate Game</button>
        <Board board={boardMap} square={squareSize} piece={chessmenSize} tileA={A} tileB={B}/>
    </React.Fragment>
    )
}



class Game extends React.Component{
    constructor(props){super(props);this.state={data:[]}}
    render(){return(<React.Fragment><ChessSet /></React.Fragment>)}
}

export default Game;