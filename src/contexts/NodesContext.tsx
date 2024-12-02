"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { loadNodes } from "../utils/loadNodes";
import { NodeData } from "../types";

interface NodesContextType {
  allNodes: Map<string, NodeData>;
  displayedNodes: Set<string>;
  selectedNodes: Set<string>;
  highlightedNodes: Set<string>;
  hoveredNode: string;

  setDisplayedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setHighlightedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setHoveredNode: React.Dispatch<React.SetStateAction<string>>;
}

const NodesContext = createContext<NodesContextType | undefined>(undefined);

export const NodesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allNodes, setAllNodes] = useState<Map<string, NodeData>>(new Map());
  const [displayedNodes, setDisplayedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string>("");

  useEffect(() => {
    async function fetchNodes() {
      const nodes = await loadNodes();
      setAllNodes(nodes);
      setDisplayedNodes(new Set(nodes.keys()));
    }
    fetchNodes();

  }, []);

  const contextValue = useMemo(
    () => ({
      allNodes,
      displayedNodes,
      selectedNodes,
      highlightedNodes,
      hoveredNode,
      setDisplayedNodes,
      setSelectedNodes,
      setHighlightedNodes,
      setHoveredNode
    }),
    [allNodes, selectedNodes, highlightedNodes, hoveredNode]
  );

  return (
    <NodesContext.Provider value={contextValue}>
      {children}
    </NodesContext.Provider>
  );
};

export const useNodes = (): NodesContextType => {
  const context = useContext(NodesContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodesProvider");
  }
  return context;
};
