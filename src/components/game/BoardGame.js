import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import PropTypes from 'prop-types';
import useImage from 'use-image';
import $ from "jquery";

// Chess Engine from Chess.js
const chessMoves = require('chess');
const moveEngine = chessMoves.create({ PGN : true });

// Component which draws game board, renders the 
// chess pieces and simulates a game using the move engine
const ChessSet = (props) => {
    {/*
        const simulationRate = props.game.
        const n = props.game.
        const RANK = props.game.
        const FILE = props.game.
        const squareSize = props.game.
        const chessmenSize = props.game.
        const Top = props.game.
        const Bottom = props.game.
        const Left = props.game.
        const Right = props.game.
        const boardHeight = props.game.
        const boardWidth = props.game.
        const colorA = props.game.
        const colorB = props.game.
        const positions = props.game.
    */}

    // Set Board Map to a State Variable
    const [boardMap, updateBoardMap] = useState(props.game.positions)

    // Int for selecting a random move
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const test_moves = [
        {
            Na3 :{
                "dest": {
                    file: "a", piece: null, rank: 3
                },
                "src": {
                    file: "b", piece: null, rank: 1
                }
            }
        },
        {
            Nc3 :{
                "dest": {
                    file: "c", piece: null, rank: 3
                },
                "src": {
                    file: "b", piece: null, rank: 1
                }
            }
        },
        {
            Nf3 :{
                "dest": {
                    file: "f", piece: null, rank: 3
                },
                "src": {
                    file: "g", piece: null, rank: 1
                }
            }
        },
        {
            Nh3 :{
                "dest": {
                    file: "h", piece: null, rank: 3
                },
                "src": {
                    file: "g", piece: null, rank: 1
                }
            }
        },
    ]
    const tst_mvs = []
    var move_counter = 0

    // Simulate a Random Walk Chess Game
    function simulateGame() {

        let mv = [];

        setTimeout(function (d,i) {
            let status = moveEngine.getStatus();
            let validMoves = status.notatedMoves;

            Object.keys(moveEngine.notatedMoves).forEach((notation) => { mv.push(notation) });
            console.log("Valid MOVES", validMoves)
            const num = getRandomInt(0,mv.length)
            const move = validMoves[mv[num]]

            let source = move.src.file+move.src.rank
            let target = move.dest.file+move.dest.rank

            moveEngine.move(mv[num])
            Move(source, target)

            simulateGame();

            }, 1000);

    }

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
                />)


        };

    // Render Chessboard
    const Board = (props) => {
        return (
            <Stage height={props.square} width={props.square} key={"STAGE"} className={"STAGE"}>
                <Layer key={"BOARD"}>
                    {props.boardMap.map((d, i) => {
                        return (
                            <React.Fragment>
                                <Rect
                                    key={d.cell+"_TILE"}
                                    name={d.cell}
                                    x={d.bX}
                                    y={d.bY}
                                    width={props.square}
                                    height={props.square}
                                    fill={ i % 2 !== 0 ? props.tileA : i % 2 !== 0 ?  props.tileA : props.tileB}
                                    shadowBlur={2}
                                    onClick={(s) => { return (s.toString()) }} />
                                <Text key={d.cell + "_TEXT"} text={d.cell} fontSize={15} x={d.bX} y={d.bY} />

                            </React.Fragment>
                        )
                    })}
                </Layer>
                <Layer key={"PIECES"}>
                    {props.boardMap.map((d, i) => {
                        return (
                            <Material
                                pth={'./pieces/' + d.svg}
                                pos={d.pos}
                                x={d.iX}
                                y={d.iY}
                                id={d.id}
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

    // Move Pieces Programmatically
    function Move(src, tgt, cls){
        let boardMapIndex = boardMap.findIndex(x => x.pos === src);
        let position = boardMap.find(x => x.cell === tgt);

        const update = {
                    bX: boardMap[boardMapIndex].bX,
                    bY: boardMap[boardMapIndex].bY,
                    cell: boardMap[boardMapIndex].cell,
                    iX: position.bX,
                    iY: position.bY,
                    id: boardMap[boardMapIndex].id,
                    name: boardMap[boardMapIndex].name,
                    player: boardMap[boardMapIndex].player,
                    pos: boardMap[boardMapIndex].pos,
                    svg: boardMap[boardMapIndex].svg
                }

        boardMap[boardMapIndex].pos = tgt;
        boardMap[boardMapIndex].iX = position.bX;
        boardMap[boardMapIndex].iY = position.bY;

        updateBoardMap(boardMap => [...boardMap, update]);

        {/*  //https://www.robinwieruch.de/react-update-item-in-list
        //let newBoardMap = [ ...boardMap ];
        //newBoardMap[boardMapIndex] = update
        //updateBoardMap(newBoardMap)
        //updateBoardMap(boardMap.map(item => item.pos === src ? update : item))
        //console.log("boardMapIndex", boardMapIndex)
        //console.log("boardMap object of boardMapIndex", boardMap[boardMapIndex])
        //console.log("Target Position", position)
        //console.log("hardcoded new version of boardmap object", update)
        //console.log("Current Definition of the Board:")
        //console.log(boardMap[boardMapIndex])
        // boardMap[boardMapIndex].pos = tgt;
        //boardMap[boardMapIndex].iX = position.bX;
        //boardMap[boardMapIndex].iY = position.bY;
        //console.log("Updated Definition of the Board:")
        //console.log(boardMap[boardMapIndex])
        //console.log("hardcoded new version of boardmap object", update)
        //console.log("Length boardMap", boardMap.length)
        //let newArr = [...boardMap];
        //newArr[boardMapIndex].pos = tgt;
        //newArr[boardMapIndex].iX = position.bX;
        //newArr[boardMapIndex].iY = position.bY;
        //console.log("newArrrrrr", newArr)
        //delete boardMap[boardMapIndex]
        //newArr.splice(boardMapIndex, 1);
        //console.log("Length newArr", newArr.length)
        //console.log("Length boardMap after removal", boardMap.length)
        //updateBoardMap(boardMap => [...boardMap, update]);
        //updateBoardMap(boardMap.map(item => item.pos === src ? update : item))
        //console.log("Length boardMap after updating", boardMap.length)
        //console.log(boardMap.length)
        //let newArr = [...boardMap];
        //newArr[boardMapIndex] = update;
        //updateBoardMap([newArr])
        //updateBoardMap(newArr)
        //updateBoardMap(newArr)
        //console.log(boardMap)*/}
    }

    // Move Engine listeners and activators
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
        console.log("A Move was mode!")
        let source = move.prevSquare.file+move.prevSquare.rank
        let target = move.postSquare.file+move.postSquare.rank
    });
    moveEngine.on('promote', (square) => {
        console.log('A Pawn has been promoted!');
        console.log(square);
    });
    moveEngine.on('undo', (move) => {
        console.log('A previous move was undone!');
        console.log(move);
    });

    // Returns the board
    return  (
        <React.Fragment>
            <button key={"BUTTON"} onClick={event => simulateGame()}>Simulate Game</button>
            <Board key={"BOARD"} boardMap={boardMap} square={props.game.boardHeight} piece={props.game.chessmenSize} tileA={props.game.colorA} tileB={props.game.colorB}/>
        </React.Fragment>
    )
}

export default ChessSet;