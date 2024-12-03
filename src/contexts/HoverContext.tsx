
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { loadNodes } from "../utils/loadNodes";
import { NodeData } from "../types";

interface HoverContextType {
  hoveredNode: string;
  setHoveredNode: React.Dispatch<React.SetStateAction<string>>;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);



export const HoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoveredNode, setHoveredNode] = useState<string>("");



  const contextValue = useMemo(
    () => ({
      hoveredNode,
      setHoveredNode,
    }),
    [hoveredNode]
  );

  return (
    <HoverContext.Provider value={contextValue}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = (): HoverContextType => {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodesProvider");
  }
  return context;
};
