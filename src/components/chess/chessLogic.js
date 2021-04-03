import React, { Component } from 'react';
const chess = require('chess');

const Gambit = (props) => {

    {/*

        https://www.npmjs.com/package/chess
        https://brozeph.github.io/node-chess/ss

    */}

    const gameClient = chess.create({ PGN : true });

    function timeout() {
        let mv = [];
        setTimeout(function (d,i) {
            let status = gameClient.getStatus();
            let validMoves = status.notatedMoves;
            const move = validMoves[Math.floor(Math.random() * validMoves.length)];

            Object.keys(gameClient.notatedMoves).forEach((notation) => {
                mv.push(notation)
                console.log("notation",notation);
            });
            gameClient.move(mv[0])
            timeout();

            }, 500);
    }

    // move the White Pawn located on square a2 forward two squares
    // let move = gameClient.move('a4');
    {/*
    let move, status;
    console.log("Connected!")

    status = gameClient.getStatus();
    console.log("status", status)

    move = gameClient.move('a4');
    console.log("move", move)

    status = gameClient.getStatus();
    console.log("status", status)

    */}


    // when a capture occurs
    gameClient.on('capture', (move) => {
        console.log('A piece has been captured!');
        console.log(move);
    });

    // when a castle occurs
    gameClient.on('castle', (move) => {
        console.log('A castle has occured!');
        console.log(move);
    });

    // when a King is placed in check
    gameClient.on('check', (attack) => {
        console.log('The King is under attack!');
        console.log(attack);
    });

    // when King is placed in checkmate
    gameClient.on('checkmate', (attack) => {
        console.log('The game has ended due to checkmate!');
        console.log(attack);
    });

    // when en Passant occurs
    gameClient.on('enPassant', (move) => {
        console.log('An en Passant has occured!');
        console.log(move);
    });

    // when a move occurs on the board
    gameClient.on('move', (move) => {
        console.log('A piece was moved!');
        console.log(move);
    });

    // when a Pawn promotion occurs
    gameClient.on('promote', (square) => {
        console.log('A Pawn has been promoted!');
        console.log(square);
    });

    // when an undo function is called on a move
    gameClient.on('undo', (move) => {
        console.log('A previous move was undone!');
        console.log(move);
    });


    return (
      <React.Fragment>
        i only need the info not the rendered html
      </React.Fragment>
    );


}

export default Gambit;
