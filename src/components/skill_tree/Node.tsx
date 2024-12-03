import React, { useCallback, useEffect, useState } from 'react';
import { NodeData } from '../../types';
import { useNodes } from '@/contexts/NodesContext';
import { useHover } from '@/contexts/HoverContext';

interface NodeProps {
  node: NodeData;
}

const Node: React.FC<NodeProps> = React.memo(({ node})=> {
  const {setSelectedNodes, selectedNodes, highlightedNodes, displayedNodes} = useNodes();
  const {setHoveredNode} = useHover();

  
  
  const isHighlighted = highlightedNodes.has(node.id);
  const isSelected = selectedNodes.has(node.id);
  const isVisible = displayedNodes.has(node.id);

  const handleClick = () => {
    const updatedSelectedNodes = new Set(selectedNodes);  // Create a copy of the selectedNodes set

    if (updatedSelectedNodes.has(node.id)) {
      updatedSelectedNodes.delete(node.id);  // Remove the node.id if it exists
    } else {
      updatedSelectedNodes.add(node.id);  // Add the node.id if it doesn't exist
    }
  
    setSelectedNodes(updatedSelectedNodes);
  };

  const handleMouseEnter = () => {
    setHoveredNode(node.id); // Only update the hovered node on mouse enter
  };

  const handleMouseLeave = () => {
    setHoveredNode(""); // Reset the hovered node on mouse leave
  };

  return (

      <div
        id={`passive-${node.id}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          absolute 
          transform 
          -translate-x-1/2 
          -translate-y-1/2 
          cursor-pointer 
          rounded-full
          ${!isVisible ? "hidden" : ""}
          
          ${isHighlighted ? 'border border-red-500' : ""} 
          ${isHighlighted ? 'opacity-90' : isSelected ? 'opacity-100' : 'opacity-35'}
          ${node.type === 'small' ? 'w-[3px]' : 'w-[5px]'}
          ${isSelected ? "bg-blue-500" :
            node.stats.length === 0 ? 'bg-red-400' :
            isHighlighted && !isSelected ? 'bg-transparent' :
            node.type === 'keystone' ? 'bg-green-400' :
            node.type === 'notable' ? 'bg-yellow-400' : 'bg-white'}

        `}
        style={{
          aspectRatio: '1',
          left: `${node.x * 100}%`,
          top: `${node.y * 100}%`,
        }}
      ></div>

  );
});

export default Node;
