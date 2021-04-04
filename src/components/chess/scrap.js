{/*  const selectPiece = (d) => {
        // console.log("Piece:", d.target.attrs)
    };

    const chessmanCapabilities = `
                    Kings move one square in any direction, so long as that square is not attacked by an enemy piece. Additionally, kings are able to make a special move, know as castling.
                    Queens move diagonally, horizontally, or vertically any number of squares. They are unable to jump over pieces.
                    Rooks move horizontally or vertically any number of squares. They are unable to jump over pieces. Rooks move when the king castles.
                    Bishops move diagonally any number of squares. They are unable to jump over pieces.
                    Knights move in an ‘L’ shape’: two squares in a horizontal or vertical direction, then move one square horizontally or vertically. They are the only piece able to jump over other pieces.
                    Pawns move vertically forward one square, with the option to move two squares if they have not yet moved. Pawns are the only piece to capture different to how they move. Pawns capture one square diagonally in a forward direction.
                    Pawns are unable to move backward on captures or moves. Upon reaching the other side of the board a pawn promotes into any other piece, except for a king. Additionally, pawns can make a special move named En Passant.
                `
    const movePiece(id){

    }
    const clickTile = (d) => {
        // console.log(d.target.attrs.name)
        // console.log(d.target._id)
    };
import React from 'react';

const [datas, setDatas] = useState([
    {
      id:   1,
      name: 'john',
      gender: 'm'
    }
    {
      id:   2,
      name: 'mary',
      gender: 'f'
    }
]);

const updateFieldChanged = index => e => {

    console.log('index: ' + index);
    console.log('property name: '+ e.target.name);
    let newArr = [...datas]; // copying the old datas array
    newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to

    setDatas(newArr); // ??
}

return (
    <React.Fragment>
        { datas.map( (data, index) => {
              <li key={data.name}>
                <input type="text" name="name" value={data.name} onChange={updateFieldChanged(index)}  />
              </li>
          })
        }
    </React.Fragment>
)
*/}