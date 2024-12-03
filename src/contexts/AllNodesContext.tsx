
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { loadNodes } from "../utils/loadNodes";
import { NodeData } from "../types";

interface AllNodesContextType {
    allNodes: Map<string, NodeData>;
    setAllNodes: React.Dispatch<React.SetStateAction<Map<string, NodeData>>>;
}

const AllNodesContext = createContext<AllNodesContextType | undefined>(undefined);



export const AllNodesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allNodes, setAllNodes] = useState<Map<string, NodeData>>(new Map());

  useEffect(() => {
    async function fetchNodes() {
      const nodes = await loadNodes();
      setAllNodes(nodes);
    }
    fetchNodes();
  }, []);


  const contextValue = useMemo(
    () => ({
      allNodes,
      setAllNodes
    }),
    [allNodes]
  );

  return (
    <AllNodesContext.Provider value={contextValue}>
      {children}
    </AllNodesContext.Provider>
  );
};

export const useAllNodes = (): AllNodesContextType => {
  const context = useContext(AllNodesContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodesProvider");
  }
  return context;
};
