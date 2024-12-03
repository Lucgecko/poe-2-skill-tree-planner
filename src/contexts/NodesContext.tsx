"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { loadNodes } from "../utils/loadNodes";
import { NodeData } from "../types";
import { useAllNodes } from "./AllNodesContext";

interface NodesContextType {
  displayedNodes: Set<string>;
  selectedNodes: Set<string>;
  highlightedNodes: Set<string>;
  savedTrees: Map<string, Set<string>>;

  setDisplayedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setHighlightedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSavedTrees: React.Dispatch<React.SetStateAction<Map<string, Set<string>>>>;
}

const NodesContext = createContext<NodesContextType | undefined>(undefined);



export const NodesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayedNodes, setDisplayedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());
  const [savedTrees, setSavedTrees] = useState<Map<string, Set<string>>>(new Map());

  const {allNodes} = useAllNodes();

  useEffect(() => {
    async function fetchNodes() {
      const keys = new Set(allNodes.keys().filter((id)=>!id.includes('-')));
      setDisplayedNodes(keys);
    }
    fetchNodes();

    const saved = localStorage.getItem("savedTree");
    if (saved) {
      const parsedSavedTree = new Map<string, Set<string>>(
        JSON.parse(saved).map(([key, value]: [string, string[]]) => [key, new Set(value)])
      );
      setSavedTrees(parsedSavedTree);
    }

  }, []);

  useEffect(() => {
    // Save the savedTree to localStorage whenever it changes
    if (savedTrees.size > 0) {
      const saved = Array.from(savedTrees.entries()).map(([key, set]) => [key, Array.from(set)]);
      localStorage.setItem("savedTree", JSON.stringify(saved));
    }
  }, [savedTrees]);


  const contextValue = useMemo(
    () => ({
      displayedNodes,
      selectedNodes,
      highlightedNodes,
      savedTrees,
      setDisplayedNodes,
      setSelectedNodes,
      setHighlightedNodes,
      setSavedTrees
    }),
    [displayedNodes, selectedNodes, highlightedNodes, savedTrees]
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
