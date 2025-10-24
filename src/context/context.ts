import { createContext } from "react";
import type { PlayerContextType } from "../types/PlayerContextType";

const PlayerContext = createContext<PlayerContextType | null>(null);

export default PlayerContext;
