// hooks/useNodes.ts
import { useState, useEffect } from 'react';
import { NodeData } from '../types';
import { loadNodes } from '../utils/loadNodes';

export function useNodes() {
  const [allNodes, setAllNodes] = useState<Map<string, NodeData>>(new Map());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const highlightedNodes = Array.from(allNodes.values()).map((node) => {
    const lowerQuery = searchQuery.toLowerCase();
    node.highlighted =
      lowerQuery.length > 0 &&
      (node.name?.toLowerCase().includes(lowerQuery) ||
        node.stats.some((stat) => stat.toLowerCase().includes(lowerQuery)));
    return node;
  });
  

  const [searchQuery, setSearchQuery] = useState('');
  const [hideSmallPassives, setHideSmallPassives] = useState(false);
  const [hideNoStatPassives, setHideNoStatPassives] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const loadedNodes = await loadNodes();
      setAllNodes(loadedNodes);
    }

    fetchData();
  }, []);

  const toggleNodeActivation = (id: string) => {
    const node = allNodes.get(id);
    if (!node) return;

    const updatedNode = { ...node, activated: !node.activated };

    setSelectedNodes((prev) => {
      const updated = new Set(prev);
      updatedNode.activated ? updated.add(id) : updated.delete(id);
      return updated;
    });

    setAllNodes((prev) => {
      const updated = new Map(prev);
      updated.set(id, updatedNode);
      return updated;
    });
  };

  const resetNodes = () => {
    setSelectedNodes(new Set());
    setAllNodes((prev) => {
      const updated = new Map(prev);
      updated.forEach((node) => {
        node.activated = false;
        node.highlighted = false;
      });
      return updated;
    });
  };



  return {
    allNodes,
    selectedNodes,
    searchQuery,
    hideSmallPassives,
    hideNoStatPassives,
    setSearchQuery,
    setHideSmallPassives,
    setHideNoStatPassives,
    toggleNodeActivation,
    resetNodes,
    highlightedNodes,
  };
}
