import React, { JSX } from "react";
import Board from "./board";
export type direction = "N" | "E" | "S" | "W";

abstract class Item {
    abstract positionX: number;
    abstract positionY: number;
    abstract direction: direction;
    abstract boardID: number;
    abstract name?: string;
    abstract icon?: string;
    abstract board: Board;
    abstract setPosition(x: number, y: number): void;
    abstract setDirection(direction: direction): void;
    abstract setBoardID(id: number): void;
    abstract move(): boolean;

    abstract getIcon(): JSX.Element;
    abstract getSpritePosition(direction: direction): string;
}
export default Item;

