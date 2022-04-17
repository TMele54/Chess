import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import PropTypes from 'prop-types';
import useImage from 'use-image';
import $ from "jquery";

// Design
import { makeStyles,createTheme,ThemeProvider  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonIcon from '@material-ui/icons/People';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated, Fade } from 'react-spring';


// Chess Engine from Chess.js
const chessMoves = require('chess');
const moveEngine = chessMoves.create({ PGN : true });
const blackCapturedWhite = Array()
const whiteCapturedBlack = Array()
const captured = Array()

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const useStylesModal = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const useStylesButtonGroup = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const useStylesContainer = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));
const useStylesButton = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));
const useStylesCard = makeStyles((theme) => ({
  root: {
    minWidth: 275,
      paddingBottom: "0px !important"
  },
  bullet: {
    display: '',
    margin: '0 2px',
    transform: 'scale(0.8)',
      paddingBottom: "0px !important"
  },
  title: {
    fontSize: 14,
      paddingBottom: "0px !important"
  },
  pos: {
    marginBottom: 1,
      paddingBottom: "0px !important"
  },
}));
const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// Component which draws game board, renders the 
// chess pieces and simulates a game using the move engine
const ChessSet = (props) => {

    // Set Board Map to a State Variable
    const [boardMap, updateBoardMap] = useState(props.game.positions)

    const [open, setOpen] = React.useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const classesButton = useStylesButton();
    const classesCard = useStylesCard();
    const classesGrid = useStylesGrid();
    const classesButtonGroup = useStylesButtonGroup();
    const classesContainer = useStylesContainer();
    const classesModal = useStylesModal();

    // Int for selecting a random move
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Simulate a Random Walk Chess Game
    function simulateGame() {

        let mv = [];

        setTimeout(function (d,i) {
            let status = moveEngine.getStatus();
            let validMoves = status.notatedMoves;

            Object.keys(moveEngine.notatedMoves).forEach((notation) => { mv.push(notation) });
            console.log("Valid MOVES", validMoves)
            console.log("Valid MOVES len", validMoves.length)

            const num = getRandomInt(0,mv.length-1)
            console.log("Move Index is", num)

            const move = validMoves[mv[num]]
            console.log("The move", move)

            let source = move.src.file+move.src.rank
            let target = move.dest.file+move.dest.rank

            console.log("Intended Source", source)
            console.log("Intended Target", target)

            moveEngine.move(mv[num])
            Move(source, target)

            simulateGame();

            }, 3000);

    }

    // Simulate a Random Walk Chess Game
    function singlePlayerGame() {
        handleOpenModal()
        const opponentPlayers = {
         10: "Alexander Alekhine",
          9: "Mikhail Tal",
          8: "Emanuel Lasker",
          7: "Vladimir Kramnik",
          6: "Mikhail Botvinnik",
          5: "Anatoly Karpov",
          4: "Jose Raul Capablanca",
          3: "Bobby Fischer",
          2: "Magnus Carlsen",
          1: "Garry Kasparov",
        }
        let mv = [];

        setTimeout(function (d,i) {
            let status = moveEngine.getStatus();
            let validMoves = status.notatedMoves;

            Object.keys(moveEngine.notatedMoves).forEach((notation) => { mv.push(notation) });
            console.log("Valid MOVES", validMoves)
            console.log("Valid MOVES len", validMoves.length)

            const num = getRandomInt(0,mv.length-1)
            console.log("Move Index is", num)

            const move = validMoves[mv[num]]
            console.log("The move", move)

            let source = move.src.file+move.src.rank
            let target = move.dest.file+move.dest.rank

            console.log("Intended Source", source)
            console.log("Intended Target", target)

            moveEngine.move(mv[num])
            Move(source, target)

            simulateGame();

            }, 3000);

    }

    // Simulate a Random Walk Chess Game
    function multiPlayerGame() {

        let mv = [];

        setTimeout(function (d,i) {
            let status = moveEngine.getStatus();
            let validMoves = status.notatedMoves;

            Object.keys(moveEngine.notatedMoves).forEach((notation) => { mv.push(notation) });
            console.log("Valid MOVES", validMoves)
            console.log("Valid MOVES len", validMoves.length)

            const num = getRandomInt(0,mv.length-1)
            console.log("Move Index is", num)

            const move = validMoves[mv[num]]
            console.log("The move", move)

            let source = move.src.file+move.src.rank
            let target = move.dest.file+move.dest.rank

            console.log("Intended Source", source)
            console.log("Intended Target", target)

            moveEngine.move(mv[num])
            Move(source, target)

            simulateGame();

            }, 3000);

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
                                    fill={d.cellFill}
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

    // Render Captured Pieces
    const Captured = (props) => {
        if (props.captures.length === 0){
            return ( null )
        }
        else {
            return (
                <Stage height={200} width={props.width} key={"CSTAGE"} className={"CSTAGE"}>
                    <Layer key={"CPanel"}>
                      {props.captures.map((d, i) => {
                            return (
                                <React.Fragment>
                                    <Text key={d.piece + "_Captured"}
                                          text={d.capturer + " captured " + d.capturee + "on" + d.position + ". (" + d.svg + ") "}
                                          fontSize={15} x={d.bX} y={d.bY}/>
                                    <br/>
                                </React.Fragment>
                            )
                        })
                        }
                    </Layer>
                </Stage>
            )
        }
    }

    // Move Pieces Programmatically
    function Move(src, tgt, cls){
        let boardMapIndexSource = boardMap.findIndex(x => x.cell === src);
        let boardMapIndexTarget = boardMap.findIndex(x => x.cell === tgt);
        let position = boardMap.find(x => x.cell === tgt);

        console.log("The BM index Source Target", boardMapIndexSource, boardMapIndexTarget)
        console.log("The BM value Source Target", boardMap[boardMapIndexSource], boardMap[boardMapIndexTarget])

        if (boardMap[boardMapIndexTarget].player !== null){
            let item = boardMap[boardMapIndexTarget]
            if(boardMap[boardMapIndexTarget].player === "w"){
                captured.push({'caturer': "B", "capturee": "W", "material": item.piece, "position": item.pos, "svg": item.svg})
            }else{
                captured.push({'caturer': "W", "capturee": "B", "material": item.piece, "position": item.pos, "svg": item.svg})
            }
            console.log("Pieces Captured", captured)
        }

        boardMap[boardMapIndexTarget].player = boardMap[boardMapIndexSource].player
        boardMap[boardMapIndexTarget].pos = boardMap[boardMapIndexSource].pos
        boardMap[boardMapIndexTarget].id = boardMap[boardMapIndexSource].id
        boardMap[boardMapIndexTarget].svg = boardMap[boardMapIndexSource].svg
        boardMap[boardMapIndexTarget].name  = boardMap[boardMapIndexSource].name

        boardMap[boardMapIndexSource].player = null;
        boardMap[boardMapIndexSource].pos = null;
        boardMap[boardMapIndexSource].id = null;
        boardMap[boardMapIndexSource].svg = null;
        boardMap[boardMapIndexSource].name  = null;

        updateBoardMap(boardMap => [...boardMap]);

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
         <ThemeProvider theme={theme}>
             <br/>
            <Grid container direction="row" justifyContent="center" className={classesGrid.root} alignItems="center" spacing={3}>

                <Card variant="outlined" border={3} className={classesCard.root} borderRadius="50%">
                    <CardHeader  title="Championship Chess" subheader="One Pawn at a Time" style={{marginBottom: 0}} />

                    <CardContent>
                        <Board key={"BOARD"} boardMap={boardMap} square={props.game.boardHeight} piece={props.game.chessmenSize} tileA={props.game.colorA} tileB={props.game.colorB}/>
                    </CardContent>

                    <CardActions>
                        <Container className={classesContainer}>
                         <div className={classesButtonGroup.root}>
                          <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                            <Button variant="contained" color="secondary" key={"B1"} className={classesButton.button} startIcon={<LaptopChromebookIcon />} onClick={event => simulateGame()}>Simulate Game</Button>
                            <>
                                <Button variant="contained" color="primary" key={"B2"} className={classesButton.button} startIcon={<PersonIcon />} onClick={event => singlePlayerGame()}>Single Player</Button>
                                <Modal aria-labelledby="spring-modal-title" aria-describedby="spring-modal-description" className={classesModal.modal} open={open} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
                                    <Fade in={open}>
                                        <div className={classesModal.paper}>
                                        <h2 id="spring-modal-title">Spring modal</h2>
                                        <p id="spring-modal-description">react-spring animates me.</p>
                                        </div>
                                    </Fade>
                                </Modal>
                            </>
                            <Button variant="contained" color="primary" key={"B3"} className={classesButton.button} startIcon={<SupervisedUserCircleIcon />} onClick={event => multiPlayerGame()}>Multi-Player</Button>
                          </ButtonGroup>
                        </div>
                        </Container>
                    </CardActions>

               </Card>
             </Grid>
         </ThemeProvider>
    )


}

export default ChessSet;