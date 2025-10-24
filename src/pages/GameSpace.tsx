import { useState } from "react";
import Grid from "../components/Grid";
import HistoryItem from "../components/HistoryItem";
import type { Grid as GridType } from "../types/grid";
import type { GameHistoryEntry } from "../types/gameHistory";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import type { CellInput } from "../types/cellInput";

function GameSpace() {
  const emptyGrid: GridType = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [player, setPlayer] = useState<"X" | "O">("X");
  const [grid, setGrid] = useState<GridType>(emptyGrid);
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);
  const [step, setStep] = useState(0);
  const [winner, setWinner] = useState<CellInput | "Tie">(null);

  const switchPlayer = () => setPlayer((prev) => (prev === "X" ? "O" : "X"));

  const checkWinner = (board: GridType): CellInput | "Tie" => {
    const lines = [
      // rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[1] === line[2]) return line[0];
    }

    const allFilled = board.every((row) => row.every((cell) => cell !== null));
    if (allFilled) return "Tie";

    return null;
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] !== null || winner) return;

    const newGrid: GridType = grid.map((r) => [...r]) as GridType;
    newGrid[row][col] = player;

    const newHistory: GameHistoryEntry = {
      playerTurn: player,
      boardState: newGrid.map((r) => [...r]) as GridType,
      moveNumber: history.length + 1,
      cellPosition: { row, col },
    };

    setGrid(newGrid);
    setHistory([...history, newHistory]);
    setStep(history.length + 1);

    const result = checkWinner(newGrid);
    if (result) {
      setWinner(result);
      if (result !== "Tie") launchConfetti();
    } else {
      switchPlayer();
    }
  };

  const handleHistoryClick = (index: number) => {
    const entry = history[index];
    if (!entry) return;
    setGrid(entry.boardState);
    setPlayer(entry.playerTurn === "X" ? "O" : "X");
    setStep(entry.moveNumber);
    setWinner(null);
  };

  const handleReset = () => {
    setGrid(emptyGrid);
    setPlayer("X");
    setHistory([]);
    setStep(0);
    setWinner(null);
  };

  const launchConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-[#0d1645] overflow-hidden">
      {/* Left: Game Board */}
      <div className="w-full md:w-1/2 h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="text-white text-3xl text-center select-none">
            Player: <span>{player}</span>
          </div>
          <Grid grid={grid} onCellClick={handleCellClick} />
          <button
            onClick={handleReset}
            className="bg-[#19224E] text-white px-8 py-4 rounded-md hover:bg-white hover:text-[#0d1645] text-xl cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Right: History */}
      <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center gap-4">
        <div className="text-white text-2xl select-none">HISTORY</div>
        <div className="rounded-lg overflow-y-auto max-h-[80vh] w-[80%]">
          {history.length === 0 ? (
            <div className="text-white text-center py-2">No moves yet</div>
          ) : (
            history.map((entry, index) => (
              <HistoryItem
                key={index}
                step={entry.moveNumber}
                player={entry.playerTurn}
                position={entry.cellPosition}
                onClick={() => handleHistoryClick(index)}
                active={step === entry.moveNumber}
              />
            ))
          )}
        </div>
      </div>

      {/* 🏆 Winner Popup */}
      <AnimatePresence>
        {winner && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white text-[#0d1645] rounded-2xl p-10 text-center shadow-2xl"
            >
              <h2 className="text-4xl font-bold mb-4">
                {winner === "Tie"
                  ? "It's a Tie 🤝"
                  : `Player ${winner} Wins 🎉`}
              </h2>
              <button
                onClick={handleReset}
                className="mt-6 px-8 py-3 bg-[#0d1645] text-white rounded-lg text-lg hover:bg-[#233170]"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameSpace;
