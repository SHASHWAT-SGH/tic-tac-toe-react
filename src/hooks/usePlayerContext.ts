import { useContext } from "react";
import type { PlayerContextType } from "../types/PlayerContextType";
import PlayerContext from "../context/context";

export const usePlayerContext = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};