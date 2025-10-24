import React, { useState } from "react";
import PlayerContext from "./context";

const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  const switchPlayer = (): void => {
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <PlayerContext.Provider value={{ currentPlayer, switchPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
