"use client";

import React, { useEffect, useState } from "react";
import { useNodes } from "../../contexts/NodesContext";


interface LeftSidebarProps {
  }
  
  export default function LeftSidebar({ }: LeftSidebarProps) {
    const { selectedNodes, setSelectedNodes, allNodes, setDisplayedNodes, setHighlightedNodes } = useNodes();
  
    // Local states for the sidebar filters and search query
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [hideSmallPassives, setHideSmallPassives] = useState<boolean>(false);
    const [hideNoStatPassives, setHideNoStatPassives] = useState<boolean>(false);


    const onSearchChange = (query: string) => {
      setSearchQuery(query.toLowerCase());
    };
  
    const onHideSmallChange = (checked: boolean) => {
      setHideSmallPassives(checked);

    };
  
    const onHideNoStatChange = (checked: boolean) => {
      setHideNoStatPassives(checked);
    };

    const onReset = () => {
      setSelectedNodes(new Set());
      setSearchQuery("");
      setHideSmallPassives(false);
      setHideNoStatPassives(false);
    };

    useEffect(() => {
      const newDisplayedNodes = Array.from(allNodes.values())
        .filter((node) => {
          // Hide small nodes if selected
          if (hideSmallPassives && node.type === "small") return false;
  
          // Hide nodes with no stats if selected
          if (hideNoStatPassives && node.stats.length === 0) return false;
  
          return true;
        })
        .map((node) => node.id); // Return only IDs for displayedNodes
  
      setDisplayedNodes(new Set(newDisplayedNodes));
    }, [allNodes, hideSmallPassives, hideNoStatPassives, setDisplayedNodes]);


    useEffect(() => {  
      if (!searchQuery){
        setHighlightedNodes(new Set());
        return;
      }
        

      const highlightedNodeIds = Array.from(allNodes.values())
        .filter((node) => {
          const nameMatch = node.name?.toLowerCase().includes(searchQuery);
          const statsMatch = node.stats.some((stat) =>
            stat.toLowerCase().includes(searchQuery)
          );
          return nameMatch || statsMatch;
        })
        .map((node) => node.id);
  
      setHighlightedNodes(new Set(highlightedNodeIds));
  
    }, [allNodes, hideSmallPassives, hideNoStatPassives, searchQuery, setDisplayedNodes, setHighlightedNodes]);
  

    return (
      <div className="absolute top-2 left-2 p-4 space-y-4 z-20 bg-gray-800  select-none rounded-xl">
        <div className="w-52">
          <div>
            <input
              type="text"
              placeholder="Search nodes"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300 bg-gray-700 bg-opacity-80"
            />
          </div>

          <div className="mt-4">
            <label className="">
              <input
                type="checkbox"
                checked={hideSmallPassives}
                onChange={(e) => onHideSmallChange(e.target.checked)}
                className="mr-2"
              />
              Hide small passives
            </label>

            <br />

            <label className="">
              <input
                type="checkbox"
                checked={hideNoStatPassives}
                onChange={(e) => onHideNoStatChange(e.target.checked)}
                className="mr-2"
              />
              Hide unidentified passives
            </label>
          </div>
        </div>

        <div>

          <p>{selectedNodes.size}/122 passive skills</p>
          <button
            onClick={onReset}
            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Reset
          </button>
        </div>
      </div>
    );
  }
  