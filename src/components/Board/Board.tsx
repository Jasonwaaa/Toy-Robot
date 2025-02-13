
import {JSX} from 'react';
import './Board.css';
//import Item from '../../models/item';




interface BoardProps {
    BoardArray: number[][];
    //cellContentMapping:Record<number, Item|null>;
    cellContentMapping: Record<number, JSX.Element|null>;
}


function Board({ BoardArray, cellContentMapping }: BoardProps): JSX.Element {

    return(
        <div className='board'>
            {BoardArray.map((row, i) => (
                <div key={i} className='row'>
                    {row.map((cell, j) => (
                        //<div key={j} className="cell">{cellContentMapping[cell]?.getIcon()}</div>
                        <div key={j} className="cell">{cellContentMapping[cell]}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board;