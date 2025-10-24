import Cell from "./Cell";
import type { Grid as GridType } from "../types/grid";

type Props = {
  grid: GridType;
  onCellClick: (row: number, col: number) => void;
};

function Grid({ grid, onCellClick }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}

export default Grid;
