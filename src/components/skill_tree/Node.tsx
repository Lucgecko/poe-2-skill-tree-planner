import React, { useEffect, useState } from 'react';
import { NodeData } from '../../types';
import { useNodes } from '@/contexts/NodesContext';

interface NodeProps {
  node: NodeData;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  const {setHoveredNode,setSelectedNodes, selectedNodes, highlightedNodes} = useNodes();
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsHighlighted(highlightedNodes.has(node.id));
  }, [highlightedNodes, node.id]);

  useEffect(() => {
    setIsSelected(selectedNodes.has(node.id));
  }, [selectedNodes, node.id]);


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
    setHoveredNode(node.id);
  };

  const handleMouseLeave = () => {
    setHoveredNode(""); 
  };



  

  return (

      <div
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
          
          ${isHighlighted ? 'border border-red-500' : ""} 
          ${isHighlighted ? 'opacity-90' : isSelected ? 'opacity-75' : 'opacity-35'}
          ${node.type === 'small' ? 'w-[3px] h-[3px]' : 'w-[5px] h-[5px]'}
          ${node.stats.length === 0 ? 'bg-red-400' :
            isHighlighted && !isSelected ? 'bg-transparent' :
            node.type === 'keystone' ? 'bg-green-400' :
            node.type === 'notable' ? 'bg-yellow-400' : 'bg-white'}
        `}
        style={{
          left: `${node.x * 100}%`,
          top: `${node.y * 100}%`,
        }}
      ></div>

  );
};

export default Node;
