// Purpose: This file contains the class Board which is used to represent the game board and contains the methods to place, remove and move items on the board.
import { JSX } from 'react';
import Item from './item'


export default class Board {
    readonly BoardArray: Array<Array<number>>=[];
    private size:number = 5;
    listeners:(()=>void)[] =[];
    readonly cellContentMapping: Record<number, JSX.Element|null> = {
        0:null,
    
    }
    constructor(size:number,){
        this.size=size;
        this.BoardArray=[];
        for(let i=0;i<size;i++){
            this.BoardArray.push([]);
            for(let j=0;j<size;j++){
                this.BoardArray[i].push(0)
            }
        }
    }

    subscribe(listener:()=>void){
        this.listeners.push(listener);
    }

    notify(){
        this.listeners.forEach(listener=>listener());    
    }

    updateBoardArray(row:number,column:number,value:number){
        this.BoardArray[row][column]=value;
        this.notify();
    }


    isValidPosition(x:number,y:number):boolean{
        return x>=0 && x<this.size && y>=0 && y<this.size;
    }

    produceBoardID():number{
        const id = Math.max(...Object.keys(this.cellContentMapping).map(Number)) + 1;
        this.cellContentMapping[id] = null;
        return id;
    }
    
    placeItem(x:number,y:number,item:Item):boolean{
        if(this.isValidPosition(x,y) && this.BoardArray[x][y]===0){
            if(item.boardID in this.cellContentMapping){
                this.updateBoardArray(x,y,item.boardID);
                this.cellContentMapping[item.boardID]=item.icon ?? null;
                item.setPosition(x,y);
            }else{
                console.error("Item not found in cellContentMapping");
                return false;
            }
            return true;
        }
        return false;
    }

    removeItem(x:number,y:number):boolean{
        if(this.isValidPosition(x,y) && this.BoardArray[x][y]!==0){
            this.updateBoardArray(x,y,0);
            return true;
        }
        return false;
    }

    moveItem(x:number,y:number,newX:number,newY:number):boolean{
        if (this.isValidPosition(x,y) && this.isValidPosition(newX,newY) && this.BoardArray[x][y]!==0 && this.BoardArray[newX][newY]===0){
            this.updateBoardArray(newX,newY,this.BoardArray[x][y]);
            this.updateBoardArray(x,y,0);
            console.log(this.BoardArray);
            console.log('出发位置为:',x,y);
            console.log('目标位置为',newX,newY);
            console.log(this.listeners);
            return true;
        }
        else{
            console.error("Invalid move");
            console.log(this.BoardArray[x][y]);
            console.log('出发位置为:',x,y);
            console.log('目标位置为',newX,newY);
            console.log(this.BoardArray);
            return false;
        }
    }
    
}