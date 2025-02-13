import React from 'react';
import {JSX} from 'react';
import Item from './item';
import {direction} from './item';
import Board from './board';

export default class Robot extends Item {
    positionX: number;
    positionY: number;
    boardID: number;
    direction: direction;
    board: Board;
    name: string;
    icon: JSX.Element|null;
    

    moveMap: Record<direction, [number, number]> = {
        "N": [-1, 0],
        "E": [0, 1],
        "S": [1, 0],
        "W": [0, -1],
    }
    
    constructor(x: number, y: number, direction: direction, board: Board) {
        super();
        this.board = board;
        this.positionX = x;
        this.positionY = y;
        this.direction = direction;
        this.name = "Robot";
        this.icon = this.getIcon();
        this.boardID = board.produceBoardID();
    }
    getSpritePosition(direction: direction): string {
        switch (direction) {
            case "N":
                return "0 -144px"; // Adjust based on your sprite sheet
            case "E":
                return "0 -96px"; // Adjust based on your sprite sheet
            case "S":
                return "0 0"; // Adjust based on your sprite sheet
            case "W":
                return "0 -48px"; // Adjust based on your sprite sheet
            default:
                return "0 0";
        }
    }

    getIcon(): JSX.Element {
        const spritePosition = this.getSpritePosition(this.direction);
        return React.createElement('span', {
            style: {
                display: 'inline-block',
                position: 'absolute',
                width: '48px',
                height: '48px',
                backgroundImage: `url(/Char_002.png)`, // Replace with your sprite sheet path
           
                backgroundPosition: spritePosition,
            }
        });
    }



    setBoardID(id: number): void {
        this.boardID = id;
    }
    setPosition(x: number, y: number): void {
        this.positionX = x;
        this.positionY = y;
    }
    setDirection(direction: direction): void {
        this.direction = direction;
    }

    move(): boolean {
        const [dx, dy] = this.moveMap[this.direction];
        if(this.board.moveItem(this.positionX, this.positionY, this.positionX + dx, this.positionY + dy)){
            this.setPosition(this.positionX + dx, this.positionY + dy);
            return true;
        }
        return false;
    }

    moveToDirection(direction: direction): boolean {
        this.setDirection(direction);
        return this.move();
    }
        

}