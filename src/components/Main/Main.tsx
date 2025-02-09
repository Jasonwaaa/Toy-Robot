import React, { JSX } from 'react';
import './Main.css';
import CPanel from '../CPanel/CPanel';
import Board from '../Board/Board';
import "./Main.css";
import BoardModel from '../../models/board';
import Robot from '../../models/robot';
import { useState } from 'react';
function Main(): JSX.Element {
    const [board] = useState(new BoardModel(5));
    const [robot] = useState(new Robot(1, 1, "N", board));
    const [BoardArray, setBoardArray] = useState(board.BoardArray);
    
    const moveDirection = (direction: "N" | "E" | "S" | "W") => {
        robot.moveToDirection(direction);
        board.notify();
      };
    React.useEffect(() => {
    const updateState = () => {
        setBoardArray([...board.BoardArray]); // 触发组件更新
    };
    board.placeItem(1, 1,robot);
    board.subscribe(updateState); // 订阅数据变化
    }, []);
    console.log(board.BoardArray);
    const cellContentMapping = board.cellContentMapping;
    console.log(cellContentMapping);
    return (
        <div className="main">
            <Board BoardArray={BoardArray} cellContentMapping={cellContentMapping} />
            <CPanel 
                moveDirection={moveDirection}
                
            />
        </div>
    );

}

export default Main;