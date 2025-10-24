import type { CellInput } from "../types/cellInput";
import type { Grid } from "../types/grid";

export function checkWinner(grid: Grid): CellInput | "Tie" {
  const lines = [
    // Rows
    [grid[0][0], grid[0][1], grid[0][2]],
    [grid[1][0], grid[1][1], grid[1][2]],
    [grid[2][0], grid[2][1], grid[2][2]],
    // Columns
    [grid[0][0], grid[1][0], grid[2][0]],
    [grid[0][1], grid[1][1], grid[2][1]],
    [grid[0][2], grid[1][2], grid[2][2]],
    // Diagonals
    [grid[0][0], grid[1][1], grid[2][2]],
    [grid[0][2], grid[1][1], grid[2][0]],
  ];

  let isMatchTie: boolean = true;

  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[0] === line[2]) {
      return line[0];
    }
    if (line[0] === null || line[1] === null || line[2] === null) {
      isMatchTie = false;
    }
  }

  return isMatchTie ? "Tie" : null;
}
