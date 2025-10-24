import type { CellInput } from "../types/cellInput";

type Props = {
  value: CellInput;
  onClick: () => void;
};

function Cell({ value, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 flex justify-center items-center border-2 border-[#0A368C] text-5xl cursor-pointer rounded-md transition-all 
      ${value === null ? "bg-[#0D2E5E] hover:bg-white" : "bg-[#0D2E5E]"}
      `}
    >
      <span
        className={`${
          value === "X" ? "text-[#A07236]" : value === "O" ? "text-[#07A3C3]" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default Cell;
