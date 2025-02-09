import { JSX } from "react";
import Robot from "../../models/robot";

import { MouseEventHandler } from "react";
interface CPanelProps {
    moveDirection: (direction: "N" | "E" | "S" | "W") => void;
  }
  


export default function CPanel({ moveDirection }: CPanelProps): JSX.Element {
    return (
        <div className="cpanel">
          <button onClick={() => moveDirection("N")}>Move North</button>
          <button onClick={() => moveDirection("E")}>Move East</button>
          <button onClick={() => moveDirection("S")}>Move South</button>
          <button onClick={() => moveDirection("W")}>Move West</button>
        </div>
      );
}