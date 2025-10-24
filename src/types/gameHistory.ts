import type { Grid } from "./grid";

export type GameHistoryEntry = {
  playerTurn: "X" | "O";
  boardState: Grid;
  moveNumber: number;
  cellPosition: { row: number; col: number };
};
