type Props = {
  step: number;
  player: "X" | "O";
  position: { row: number; col: number };
  onClick: () => void;
  active?: boolean;
};

function HistoryItem({ step, player, position, onClick, active }: Props) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 text-lg select-none cursor-pointer transition-all
        ${active ? "bg-white text-[#0d1645]" : "text-white bg-[#0C234C] hover:text-[#0d1645] hover:bg-white"}
      `}
    >
      <span className="mr-5">Step: {step}</span>
      <span className="mr-5">Player: {player}</span>
      <span>
        Position: ({position.row + 1}, {position.col + 1})
      </span>
    </div>
  );
}

export default HistoryItem;
