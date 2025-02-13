
import { render } from "@testing-library/react";
import Board from "./Board";
import { expect, describe,it } from 'vitest'
import { JSX } from "react";
//import Item from "../../models/item";

// class MockItem extends Item {
//     getIcon() {
//         return <span>🤖</span>;
//     }
// }
// 
// 数据结构 BoardArray 为一个二维数组，表示棋盘上的每个格子的值
// 数据结构 cellContentMapping 为一个字典，表示每个格子的值对应的图标
// 在测试中,我会将 BoardArray 和 cellContentMapping 作为参数传入 Board 组件
// 通过测试来验证 Board 组件是否正确渲染了棋盘
// 通过 BoardArray 和 cellContentMapping 生成一个随机的 BoardArray 和 cellContentMapping
// 例如[[1,2,3],[4,5,6]]这种二维数组的生成
  type BoardArray = number[][];
    //cellContentMapping:Record<number, Item|null>;
  type cellContentMapping=Record<number, JSX.Element|null>;

const MockItem = (n:number):JSX.Element => {
    return <span>{n}</span>;
}
const generateRandomBoardArray = (size: number) => {
    const boardArray: BoardArray = [];
    const cellContentMapping: cellContentMapping= {};

    for (let i = 0; i < size; i++) {
        boardArray.push([]);
        for (let j = 0; j < size; j++) {
            const id=(Math.floor(Math.random() * 10));
            boardArray[i].push(id);
            cellContentMapping[id] = MockItem(boardArray[i][j]);
        }
    }
    return [boardArray, cellContentMapping];
}
describe("Board Component", () => {
    it("renders correctly with given BoardArray and cellContentMapping", () => {
        const boardArray = [
            [1, 2],
            [3, 4],
        ];
        const cellContentMapping = {
            1:  MockItem(1),
            2:  MockItem(2),
            3:  MockItem(3),
            4:  MockItem(4),
        };

        const { container } = render(
            <Board BoardArray={boardArray} cellContentMapping={cellContentMapping} />
        );

        expect(container.getElementsByClassName("cell").length).toBe(4);
        expect(container.querySelectorAll("span").length).toBe(4);
         // Check the first cell contains value 1
         expect(container.querySelector(".cell span")?.textContent).toBe("1");
         // Check the second cell contains value 2
         expect(container.querySelectorAll(".cell span")[1]?.textContent).toBe("2");
    });

    it("renders different icons based on cellContentMapping", () => {
        const boardArray = [
            [1, 2, 2],
            [3, 4, 3],
        ];
        const cellContentMapping = {
            1: MockItem(5),
            2: null,
            3: MockItem(6),
            4: null,
        };

        const { container } = render(
            <Board BoardArray={boardArray} cellContentMapping={cellContentMapping} />
        );

        expect(container.getElementsByClassName("cell").length).toBe(6);
        expect(container.querySelectorAll("span").length).toBe(3);
    });

    it("renders correctly with empty cellContentMapping", () => {
        const boardArray = [
            [1, 2],
            [3, 4],
        ];
        const cellContentMapping = {};

        const { container } = render(
            <Board BoardArray={boardArray} cellContentMapping={cellContentMapping} />
        );

        expect(container.getElementsByClassName("cell").length).toBe(4);
        expect(container.querySelectorAll("span").length).toBe(0);
    });

    it("renders correctly with random BoardArray and cellContentMapping", () => {
        const time = 5;
        for (let i = 0; i < time; i++) {
            const size = Math.floor(Math.random() * 10) + 1;
            console.log(size);
            const [boardArray, cellContentMapping] = generateRandomBoardArray(size) as [BoardArray, cellContentMapping];
            console.log(boardArray);
            console.log(cellContentMapping);
            const { container } = render(
                <Board BoardArray={boardArray} cellContentMapping={cellContentMapping} />
            );

            expect(container.getElementsByClassName("cell").length).toBe(size * size);
            expect(container.querySelectorAll("span").length).toBe(size * size);
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    const cellIndex = row * size + col;
                    const expectedValue = boardArray[row][col].toString();
                    expect(container.querySelectorAll(".cell span")[cellIndex]?.textContent).toBe(expectedValue);
                }
            } }
    });
});
