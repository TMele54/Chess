import React from "react";
import ChessSet from './BoardGame'

function initBoardMap() {

    // Timeout interval for the simulation
    const simulationRate = 5000;

    // SQRT(Number of Tiles of Chess Board)
    const n = 8;

    // Ranks
    const RANK = ["8", "7", "6", "5", "4", "3", "2", "1"]

    // Files
    const FILE = ["a", "b", "c", "d", "e", "f", "g", "h"]

    // Dimension of Board Square
    const squareSize = 80;

    // Dimension of Chessman
    const chessmenSize = squareSize + 5;

    // Padding Y
    const Top = 10;
    const Bottom = 10;

    // Padding X
    const Left = 10;
    const Right = 10;

    // Chess Board Height
    const boardHeight = Top+squareSize*8+Bottom;

    // Chess Board Width
    const boardWidth = Left+squareSize*8+Right;

    // Chess Board Square Colors
    const colorA = "#D18B47";
    const colorB = "#FFCE9E";

    // Transformation functions, RANK & FILE become a chess board
    const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
    const mapp = FILE.flatMap(d => RANK.map(v => d + v))
    const chessboard = new Array(Math.ceil(mapp.length / n)).fill().map(_ => mapp.splice(0, n))
    const field = chessboard[0].map((_, colIndex) => chessboard.map(row => row[colIndex]));
    const columns = transpose(field)

    // Chess Pieces
    const whitePieces = [
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
    const blackPieces = [
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
    const chessmen = [...blackPieces, ...whitePieces]

    const positions = Array()

    const emptySquare = { player: null, id: null, svg: null, pos: null, name: null }

    // Generate the Initial Position Map of the Board
    columns.forEach((rows,i)=>{
        rows.forEach((cell, j)=>{
            const piece = chessmen.filter(d =>  d.pos === cell )[0]
            const cellColor = i % 2 !== 0 ? j % 2 !== 0 ? colorB :colorA : j % 2 !== 0 ? colorA :colorB
            if (piece === undefined){
                let merged = {...{"cell": cell, "cellFill": cellColor, "iX": Left+squareSize*i, "iY": Top+squareSize*j, "bX": Left+squareSize*i, "bY": Top+squareSize*j}, ...emptySquare};
                positions.push(merged)
            }
            else{
                let merged = {...{"cell": cell, "cellFill": cellColor, "iX": Left+squareSize*i, "iY": Top+squareSize*j, "bX": Left+squareSize*i, "bY": Top+squareSize*j}, ...piece};
                positions.push(merged)
            }

        })
    })

    return {
        simulationRate,
        n,
        RANK,
        FILE,
        squareSize,
        chessmenSize,
        Top,
        Bottom,
        Left,
        Right,
        boardHeight,
        boardWidth,
        colorA,
        colorB,
        positions
    }

}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    render(){
        const game = initBoardMap();
        return(
            <ChessSet key={"CHESS_SET"} game={game}/>
        )
    }
}

export default Game