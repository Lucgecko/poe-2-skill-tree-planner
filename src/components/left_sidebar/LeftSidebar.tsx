"use client";

import React, { Ref, RefObject, useEffect, useState } from "react";
import { useNodes } from "../../contexts/NodesContext";
import Saves from "./Saves";
import { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import { useAscendancy } from "@/contexts/AscendancyContext";
import { useAllNodes } from "@/contexts/AllNodesContext";


interface LeftSidebarProps {
  wrapperRef: RefObject<ReactZoomPanPinchContentRef>;
  }
  
  export default function LeftSidebar({wrapperRef }: LeftSidebarProps) {
    const {allNodes} = useAllNodes();
    const { selectedNodes, setSelectedNodes, setDisplayedNodes, setHighlightedNodes, highlightedNodes , displayedNodes, savedTrees} = useNodes();
    const {ascendancy, setAscendancy, getAscendancies, getClasses, characterClass} = useAscendancy();
  
    // Local states for the sidebar filters and search query
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [hideSmallPassives, setHideSmallPassives] = useState<boolean>(false);
    const [hideNoStatPassives, setHideNoStatPassives] = useState<boolean>(false);
    const [hideNoSelectPassives, setHideNoSelectPassives] = useState<boolean>(false);
    const [hideAttrPassives, setHideAttrPassives] = useState<boolean>(false);
    const [hIndex, setHIndex] = useState<number>(0);


    const onSearchChange = (query: string) => {
      setSearchQuery(query.toLowerCase());
      setHIndex(0);

    };
  
    const onHideSmallChange = (checked: boolean) => {
      setHideSmallPassives(checked);

    };
  
    const onHideNoStatChange = (checked: boolean) => {
      setHideNoStatPassives(checked);
    };

    const onHideNoSelectChange = (checked: boolean) => {
      setHideNoSelectPassives(checked);
    };

    const onHideAttrChange = (checked: boolean) => {
      setHideAttrPassives(checked);
    };

    const onReset = () => {
      setSelectedNodes(new Set());
      setSearchQuery("");
      setHideSmallPassives(false);
      setHideNoStatPassives(false);
      setHideNoSelectPassives(false);
      setHideAttrPassives(false);
      
    };

    useEffect(() => {
      const newDisplayedNodes = Array.from(allNodes.values())
        .filter((node) => {
          // Hide small nodes if selected
          if (hideSmallPassives && node.type === "small") return false;
  
          // Hide nodes with no stats if selected
          if (hideNoStatPassives && node.stats.length === 0 && !selectedNodes.has(node.id)) return false;

          if (hideNoSelectPassives && !selectedNodes.has(node.id)) return false;

          if (hideAttrPassives && (node.name?.toLowerCase().includes('attribute'.toLowerCase()))) return false;
  
          return true;
        })
        .filter((node) => {

          const baseId = node.id.split('-')[0];

          if(node.id.toLowerCase() == `${baseId.toLowerCase()}-${ascendancy.toLowerCase()}`) return true;

          if(node.id == `${baseId}-${characterClass.toLowerCase()}`) return true;

          if(node.id == baseId && !allNodes.has(`${baseId}-${characterClass.toLowerCase()}`)) return true;

          return false;
        })
        .map((node) => node.id); // Return only IDs for displayedNodes
      
      setDisplayedNodes(new Set(newDisplayedNodes));
    }, [allNodes, hideSmallPassives, hideNoStatPassives, hideNoSelectPassives,hideAttrPassives,ascendancy, setDisplayedNodes]);



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
  
    }, [allNodes, hideSmallPassives, hideNoStatPassives, hideNoSelectPassives,hideAttrPassives, searchQuery, setDisplayedNodes, setHighlightedNodes]);
  


    const onEnter = () => {
      const nodeId = Array.from(highlightedNodes)[hIndex];
      const node = allNodes.get(nodeId);
      if (node) {
        wrapperRef?.current?.zoomToElement(`passive-${node.id}`);
      }
      setHIndex((hIndex+1) % highlightedNodes.size);
    };

    return (
      <div className="absolute top-2 left-2 p-4 space-y-4 z-20 bg-gray-800  select-none rounded-xl text-white">
        <div className="w-52">
          <div>
            <input
              type="text"
              placeholder="Search nodes"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onEnter();
                }
              }}
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
              Hide small 
            </label>

            <br />

            <label className="">
              <input
                type="checkbox"
                checked={hideNoStatPassives}
                onChange={(e) => onHideNoStatChange(e.target.checked)}
                className="mr-2"
              />
              Hide unidentified 
            </label>
<br />
            <label className="">
              <input
                type="checkbox"
                checked={hideNoSelectPassives}
                onChange={(e) => onHideNoSelectChange(e.target.checked)}
                className="mr-2"
              />
              Hide non-selected 
            </label>
            <br/>
            <label className="">
              <input
                type="checkbox"
                checked={hideAttrPassives}
                onChange={(e) => onHideAttrChange(e.target.checked)}
                className="mr-2"
              />
              Hide attributes
            </label>
          </div>
          <select
            id="saveSelector"
            value={ascendancy}
            onChange={(e) => setAscendancy(e.target.value)}
            className="p-2 border rounded-md  bg-gray-700 cursor-pointer mt-2"
            >
            {/* Render the default option only if no currentSave is selected */}
            {Array.from(getAscendancies()).map((saveName) => (
                <option key={saveName} value={saveName}>
                {saveName}
                </option>
            ))}
        </select>
        </div>

        <div>

          <p>{selectedNodes.size}/122 passive skills
          <button
            onClick={onReset}
            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2 mb-1">
            Reset
          </button>
          </p>



          <Saves/>

          <a href="https://github.com/andrej2431/poe-2-skill-tree-planner"  target="_blank" className="text-blue-500 hover:text-blue-700 font-semibold text-l">
          Contribute Here
        </a>
          <a href="https://github.com/marcoaaguiar/poe2-tree" target="_blank" className="text-blue-500 gover:text-blue-700 font-semibold text-l">
            And Here
          </a>
        <br/>
      </div>
    );
  }
  
